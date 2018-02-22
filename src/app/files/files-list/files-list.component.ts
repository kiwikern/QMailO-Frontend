import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RootState } from '../../reducers';
import { Store } from '@ngrx/store';
import { FilterField, selectAllFiles, selectFilterSettings, selectIsLoading, selectSortSettings, SortOrder } from '../qmail-file.reducer';
import { Observable } from 'rxjs/Observable';
import { MatSort, MatTableDataSource, Sort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { QmailFile } from '../qmail-file.model';
import { ChangeFilterSettings, ChangeSortSettings } from '../qmail-file.actions';

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
  filterField: FilterField;
  filterValue: string;
  onDestroy$ = new ReplaySubject<boolean>(1);
  sortSettings$: Observable<{ sortAttribute: string; sortOrder: SortOrder }>;
  filterSettings$: Observable<{ filterValue: string; filterField: FilterField }>;

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
    this.filterSettings$ = this.store.select(selectFilterSettings);
    this.filterSettings$.pipe(takeUntil(this.onDestroy$))
      .subscribe(({filterValue, filterField}) => {
        this.filterValue = filterValue;
        this.filterField = filterField;
        this.dataSource.filter = this.filterValue;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  applyFilter() {
    this.store.dispatch(new ChangeFilterSettings({filterValue: this.filterValue, filterField: this.filterField}));
  }

  sortChange(sort: Sort) {
    const sortOrder = sort.direction !== '' ? sort.direction : 'asc';
    this.store.dispatch(new ChangeSortSettings({sortAttribute: sort.active, sortOrder}));
  }

  private filterPredicate(data, filter) {
    const value = (data[this.filterField] || '').toLowerCase().trim();
    const normFilter = (filter || '').trim().toLowerCase();
    return value.includes(normFilter);
  }
}

