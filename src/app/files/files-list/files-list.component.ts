import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { selectAllFiles, selectIsLoading, selectSortSettings, SortOrder } from '../qmail-file.reducer';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { QmailFile } from '../qmail-file.model';
import { ChangeSortSettings } from '../qmail-file.actions';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesListComponent implements OnInit, AfterViewInit, OnDestroy {
  files$: Observable<QmailFile[]>;
  isLoading$: Observable<boolean>;
  columnsToDisplay = ['id', 'content'];
  dataSource = new MatTableDataSource<QmailFile>();
  searchField = 'id';
  onDestroy$ = new ReplaySubject<boolean>(1);
  sortSettings$: Observable<{ sortAttribute: string; sortOrder: SortOrder }>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store<RootState>) {
  }

  ngOnInit() {
    this.files$ = this.store.select(selectAllFiles);
    this.isLoading$ = this.store.select(selectIsLoading);
    this.files$.pipe(takeUntil(this.onDestroy$))
      .subscribe(files => this.dataSource.data = files);
    this.dataSource.filterPredicate = (data, filter) => this.filterPredicate(data, filter);
    this.sortSettings$ = this.store.select(selectSortSettings);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue;
  }

  sortChange(sort: Sort) {
    const sortOrder = sort.direction !== '' ? sort.direction : 'asc';
    this.store.dispatch(new ChangeSortSettings({sortAttribute: sort.active, sortOrder}));
  }

  private filterPredicate(data, filter) {
    const value = (data[this.searchField] || '').toLowerCase().trim();
    const normFilter = (filter || '').trim().toLowerCase();
    return value.includes(normFilter);
  }
}

