import { Component, OnInit } from '@angular/core';
import { QmailFile } from '../qmail-file.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers';
import { selectById } from '../qmail-file.reducer';
import { switchMap, tap } from 'rxjs/operators';
import { AddQmailFileRequest, UpdateQmailFileRequest } from '../qmail-file.actions';
import { InfoSnackBarService } from '../../info-snack-bar.service';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit {

  file: QmailFile = {id: '', content: ''};
  id: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: InfoSnackBarService,
              private store: Store<RootState>) {
  }

  ngOnInit() {
    this.route.params.pipe(
      tap(param => this.id = param.id),
      switchMap(() => this.store.select(selectById(this.id)))
    ).subscribe(file => {
      if (file) {
        return this.file = file;
      } else if (this.id) {
        this.snackBar.open(`File '${this.id}' could not be found.`);
        this.router.navigate(['/files']);
        return;
      }
    });
  }

  save() {
    if (!this.id) {
      this.store.dispatch(new AddQmailFileRequest({qmailFile: this.file}));
    } else {
      this.store.dispatch(new UpdateQmailFileRequest({qmailFile: this.file}));
    }
  }

}
