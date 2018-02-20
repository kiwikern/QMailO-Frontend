import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { selectJwt } from './auth.reducer';
import { RootState } from '../reducers';

@Injectable()
export class LoginGuard implements CanLoad {
  private jwt;

  constructor(private store: Store<RootState>,
              private router: Router) {
    store.select(selectJwt).subscribe(jwt => this.jwt = jwt);
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    if (this.jwt) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
