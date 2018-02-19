import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootState } from './reducers';
import { LoadQmailFilesRequest } from './files/qmail-file.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(store: Store<RootState>) {
    store.dispatch(new LoadQmailFilesRequest());
  }

}
