import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { jwtSelector } from './auth.reducer';
import { RootState } from '../reducers';

@Injectable()
export class LoginGuard implements CanActivate {
  private jwt;

  constructor(private store: Store<RootState>,
              private router: Router) {
    store.select(jwtSelector).subscribe(jwt => this.jwt = jwt);
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.jwt) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
