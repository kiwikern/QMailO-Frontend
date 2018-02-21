import { Component, OnInit } from '@angular/core';
import { selectIsSaving } from '../qmail-file.reducer';
import { Observable } from 'rxjs/Observable';
import { AddQmailFileRequest } from '../qmail-file.actions';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { QmailFile } from '../qmail-file.model';

@Component({
  selector: 'app-file-add-form',
  templateUrl: './file-add-form.component.html',
  styleUrls: ['./file-add-form.component.css']
})
export class FileAddFormComponent implements OnInit {

  isSaving$: Observable<boolean>;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);
  }

  save(qmailFile: QmailFile) {
    this.store.dispatch(new AddQmailFileRequest({qmailFile}));
  }

}
