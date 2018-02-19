import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilesListComponent } from './files-list/files-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatSortModule, MatTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { EffectsModule } from '@ngrx/effects';
import { QmailFileEffects } from './qmail-file.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './qmail-file.reducer';

const fileRoutes: Routes = [
  {path: '', component: FilesListComponent}
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
    MatSortModule
  ],
  declarations: [
    FilesListComponent
  ]
})
export class FilesModule { }
