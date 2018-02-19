import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesListComponent } from './files-list/files-list.component';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { EffectsModule } from '@ngrx/effects';
import { QmailFileEffects } from './qmail-file.effects';
import { Store, StoreModule } from '@ngrx/store';
import { reducer } from './qmail-file.reducer';
import { FileFormComponent } from './file-form/file-form.component';
import { FormsModule } from '@angular/forms';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { LoadQmailFilesRequest } from './qmail-file.actions';
import { RootState } from '../reducers';

const fileRoutes: Routes = [
  {path: '', component: FilesListComponent},
  {path: 'edit/:id', component: FileFormComponent},
  {path: 'new', component: FileFormComponent}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('files', reducer),
    EffectsModule.forFeature([QmailFileEffects]),
    RouterModule.forChild(fileRoutes),
    MatTableModule,
    CdkTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSortModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ScrollDispatchModule,
    FormsModule
  ],
  declarations: [
    FilesListComponent,
    FileFormComponent,
    FabButtonComponent
  ]
})
export class FilesModule {
  constructor(store: Store<RootState>) {
    store.dispatch(new LoadQmailFilesRequest());
  }
}
