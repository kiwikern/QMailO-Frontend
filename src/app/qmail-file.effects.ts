import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {QmailFileActionTypes} from './qmail-file.actions';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs/observable/of';


@Injectable()
export class QmailFileEffects {

  constructor(private actions$: Actions,
              private http: HttpClient) {
  }

  @Effect() load$: Observable<Action> = this.actions$.pipe(
    ofType(QmailFileActionTypes.LoadQmailFilesRequest),
    mergeMap(action =>
      this.http.get('/api/files').pipe(
        map(data => ({type: QmailFileActionTypes.LoadQmailFiles, payload: {qmailFiles: data}})),
        catchError(() => of({type: QmailFileActionTypes.LoadQmailFilesFailed}))
      ))
  );
}
