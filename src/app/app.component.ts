import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RootState } from './reducers';
import { Store } from '@ngrx/store';
import { Logout } from './auth/auth.actions';
import { jwtSelector } from './auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {

  jwt$: Store<string>;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    this.jwt$ = this.store.select(jwtSelector);
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
