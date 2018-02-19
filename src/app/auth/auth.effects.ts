import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from './auth.actions';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router,
              private snackbar: MatSnackBar) {
  }

  @Effect() login$: Observable<Action> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_REQUEST),
    mergeMap(action =>
      this.http.post<{jwt: string}>('/api/login', (<any>action).payload).pipe(
        map(data => this.login(data)),
        catchError(err => this.handleError(err))
      ))
  );

  private handleError(error) {
    console.log(error);
    if (error.status === 401) {
    this.openSnackbar('Wrong password. You can reset your password on your server.');
    } else if (error.status === 0) {
      this.openSnackbar('No internet connection.');
    } else if (error.status === 500) {
      this.openSnackbar('Internal error. Check your server logs.');
    } else {
      this.openSnackbar('Something went wrong. :-(');
    }
    return of({type: AuthActionTypes.LOGIN_FAIL});
  }

  private login(data: {jwt: string}) {
    this.router.navigate(['/files']);
    return {type: AuthActionTypes.LOGIN_SUCESS, payload: data};
  }

  private openSnackbar(message: string) {
    this.snackbar.open(message, 'OK', {duration: 5000});

  }
}
