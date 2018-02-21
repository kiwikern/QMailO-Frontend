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
  MatProgressBarModule,
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
import { FileEditFormComponent } from './file-edit-form/file-edit-form.component';
import { FormsModule } from '@angular/forms';
import { FabButtonComponent } from './fab-button/fab-button.component';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { LoadQmailFilesRequest } from './qmail-file.actions';
import { RootState } from '../reducers';
import { FileFormComponent } from './file-form/file-form.component';
import { FileAddFormComponent } from './file-add-form/file-add-form.component';

const fileRoutes: Routes = [
  {path: '', component: FilesListComponent},
  {path: 'edit/:id', component: FileEditFormComponent},
  {path: 'new', component: FileAddFormComponent}
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
    MatProgressBarModule,
    MatProgressSpinnerModule,
    ScrollDispatchModule,
    FormsModule
  ],
  declarations: [
    FilesListComponent,
    FileEditFormComponent,
    FabButtonComponent,
    FileFormComponent,
    FileAddFormComponent
  ]
})
export class FilesModule {
  constructor(store: Store<RootState>) {
    store.dispatch(new LoadQmailFilesRequest());
  }
}
