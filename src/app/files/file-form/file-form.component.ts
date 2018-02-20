import { Component, OnDestroy, OnInit } from '@angular/core';
import { QmailFile } from '../qmail-file.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from '../../reducers';
import { selectById, selectIsLoading, selectIsSaving } from '../qmail-file.reducer';
import { filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { AddQmailFileRequest, DeleteQmailFileRequest, UpdateQmailFileRequest } from '../qmail-file.actions';
import { InfoSnackBarService } from '../../info-snack-bar.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.css']
})
export class FileFormComponent implements OnInit, OnDestroy {

  file: QmailFile = {id: '', content: ''};
  id: string;
  isLoading = false;
  isSaving$: Observable<boolean>;
  onDestroy$ = new ReplaySubject<boolean>(1);

  constructor(private route: ActivatedRoute,
              private router: Router,
              private snackBar: InfoSnackBarService,
              private store: Store<RootState>) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);

    const idParam$ = this.route.params.pipe(
      tap(param => this.id = param.id),
      takeUntil(this.onDestroy$)
    );
    const isLoading$ = this.store.select(selectIsLoading).pipe(
      tap(isLoading => this.isLoading = isLoading),
      takeUntil(this.onDestroy$),
    );
    combineLatest(idParam$, isLoading$).pipe(
      filter(([id, isLoading]) => !isLoading),
      switchMap(() => this.store.select(selectById(this.id))),
      takeUntil(this.onDestroy$),
    ).subscribe(file => this.checkFile(file));
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  save() {
    if (!this.id) {
      this.store.dispatch(new AddQmailFileRequest({qmailFile: this.file}));
    } else {
      this.store.dispatch(new UpdateQmailFileRequest({qmailFile: this.file}));
    }
  }

  deleteFile() {
    const snackBarRef = this.snackBar.open('Are you sure you want to delete this file?', 'Delete file');
    snackBarRef.onAction().subscribe(() => this.store.dispatch(new DeleteQmailFileRequest({id: this.file.id})));
  }

  private checkFile(file) {
    if (file) {
      this.onDestroy$.next(true);
      return this.file = Object.assign({}, file);
    } else if (this.id) {
      this.snackBar.open(`File '${this.id}' could not be found.`);
      this.router.navigate(['/files']);
      return;
    }
  }

}
