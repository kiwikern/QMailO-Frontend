import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { QmailFileActionTypes } from './qmail-file.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { InfoSnackBarService } from '../info-snack-bar.service';
import { AuthActionTypes } from '../auth/auth.actions';


@Injectable()
export class QmailFileEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private snackBar: InfoSnackBarService,
              private router: Router) {
  }

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.LoadQmailFilesRequest),
    mergeMap(action =>
      this.http.get('/api/files').pipe(
        map(data => ({type: QmailFileActionTypes.LoadQmailFiles, payload: {qmailFiles: data}})),
        catchError(err => this.handleError(err, {type: QmailFileActionTypes.LoadQmailFilesFailed}))
      ))
  );

  @Effect() add$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.AddQmailFileRequest),
    mergeMap((action: any) => {
      return this.http.put('/api/files', action.payload.qmailFile).pipe(
        map(() => this.addSuccess(action.payload.qmailFile)),
        catchError(err => this.handleError(err, {type: QmailFileActionTypes.AddQmailFileFailed}))
      );


    })
  );

  @Effect() update$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.UpdateQmailFileRequest),
    mergeMap((action: any) =>
      this.http.post('/api/files', action.payload.qmailFile).pipe(
        map(() => this.updateSuccess(action.payload.qmailFile)),
        catchError(err => this.handleError(err, {type: QmailFileActionTypes.UpdateQmailFileFailed}))
      ))
  );

  @Effect() delete$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.DeleteQmailFileRequest),
    mergeMap((action: any) =>
      this.http.delete(`/api/files/${action.payload.id}`).pipe(
        map(() => this.deleteSuccess(action.payload.id)),
        catchError(err => this.handleError(err, {type: QmailFileActionTypes.DeleteQmailFileFailed}))
      ))
  );

  private handleError(error: HttpErrorResponse, action): Observable<any> {
    const actions = [action];
    switch (error.status) {
      case 0:
        this.snackBar.open('Could not connect. Check your internet connection.');
        break;
      case 401:
        this.snackBar.open('You need to be logged in.');
        actions.push({type: AuthActionTypes.LOGOUT});
        break;
      case 404:
        this.snackBar.open('File does not exist and cannot be edited.');
        actions.push({type: QmailFileActionTypes.LoadQmailFilesRequest});
        break;
      case 409:
        this.snackBar.open('File does already exist. Edit the file from the list instead.');
        break;
      case 400:
        this.snackBar.open(error.error);
        break;
      case 504:
        this.snackBar.open('Server not reachable.');
        break;
      case 500:
        this.snackBar.open('Something went wrong. Check the server logs.');
        break;
      default:
        console.log(error);
        this.snackBar.open('Something went wrong. Check the browser console.');
    }
    return of(actions).pipe(switchMap(a => a));
  }

  private addSuccess(qmailFile) {
    this.snackBar.open(`File ${qmailFile.id} was successfully added.`);
    this.router.navigate(['/files']);
    return {type: QmailFileActionTypes.AddQmailFile, payload: {qmailFile}};
  }

  private deleteSuccess(id) {
    this.snackBar.open(`File ${id} was successfully deleted.`);
    this.router.navigate(['/files']);
    return {type: QmailFileActionTypes.DeleteQmailFile, payload: {id}};
  }

  private updateSuccess(qmailFile) {
    this.snackBar.open(`File ${qmailFile.id} was successfully edited.`);
    const change = {id: qmailFile.id, changes: {content: qmailFile.content}};
    this.router.navigate(['/files']);
    return {type: QmailFileActionTypes.UpdateQmailFile, payload: {qmailFile: change}};
  }
}
