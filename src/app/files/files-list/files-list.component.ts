import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectAllFiles } from '../qmail-file.reducer';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { QmailFile } from '../qmail-file.model';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css']
})
export class FilesListComponent implements OnInit, AfterViewInit, OnDestroy {
  $files: Observable<QmailFile[]>;
  columnsToDisplay = ['id', 'content'];
  dataSource = new MatTableDataSource<QmailFile>();
  searchField = 'id';
  $onDestroy = new ReplaySubject<boolean>(1);

  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    this.$files = this.store.select(selectAllFiles);
    this.$files.pipe(takeUntil(this.$onDestroy))
      .subscribe(files => this.dataSource.data = files);
    this.dataSource.filterPredicate = (data, filter) => this.filterPredicate(data, filter);

    this.sort.sort({id: 'id', start: 'asc', disableClear: true});
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.$onDestroy.next(true);
    this.$onDestroy.complete();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  private filterPredicate(data, filter) {
    const value = (data[this.searchField] || '').toLowerCase().trim();
    const normFilter = (filter || '').trim().toLowerCase();
    return value.includes(normFilter);
  }
}

