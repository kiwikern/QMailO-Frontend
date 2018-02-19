import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { QmailFileActionTypes } from './qmail-file.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';


@Injectable()
export class QmailFileEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.LoadQmailFilesRequest),
    mergeMap(action =>
      this.http.get('/api/files').pipe(
        map(data => ({type: QmailFileActionTypes.LoadQmailFiles, payload: {qmailFiles: data}})),
        catchError(() => of({type: QmailFileActionTypes.LoadQmailFilesFailed}))
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

  private handleError(error: HttpErrorResponse, action) {
    switch (error.status) {
      case 0:
        this.showSnackbar('Could not connect. Check your internet connection.');
        break;
      case 404:
        this.showSnackbar('File does not exist and cannot be edited.');
        break;
      case 409:
        this.showSnackbar('File does already exist. Edit the file from the list instead.');
        break;
      case 400:
        this.showSnackbar(error.error);
        break;
      case 500:
      default:
        this.showSnackbar('Something went wrong. :-( Check the server logs.');
    }
    return of(action);
  }

  private addSuccess(qmailFile) {
    this.showSnackbar(`File ${qmailFile.id} was successfully added.`);
    this.router.navigate(['/files']);
    return {type: QmailFileActionTypes.AddQmailFile, payload: {qmailFile}};
  }

  private updateSuccess(qmailFile) {
    this.showSnackbar(`File ${qmailFile.id} was successfully edited.`);
    const change = {id: qmailFile.id, changes: {content: qmailFile.content}};
    this.router.navigate(['/files']);
    return {type: QmailFileActionTypes.UpdateQmailFile, payload: {qmailFile: change}};
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'OK', {duration: 3000});
  }
}
