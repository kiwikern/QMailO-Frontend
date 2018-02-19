import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {QmailFile} from './qmail-file.model';

export enum QmailFileActionTypes {
  LoadQmailFiles = '[QmailFile] Load QmailFiles',
  LoadQmailFilesRequest = '[QmailFile] Request Loading QmailFiles',
  LoadQmailFilesFailed = '[QmailFile] Loading QmailFiles Failed',
  AddQmailFile = '[QmailFile] Add QmailFile',
  UpsertQmailFile = '[QmailFile] Upsert QmailFile',
  AddQmailFiles = '[QmailFile] Add QmailFiles',
  UpsertQmailFiles = '[QmailFile] Upsert QmailFiles',
  UpdateQmailFile = '[QmailFile] Update QmailFile',
  UpdateQmailFiles = '[QmailFile] Update QmailFiles',
  DeleteQmailFile = '[QmailFile] Delete QmailFile',
  DeleteQmailFiles = '[QmailFile] Delete QmailFiles',
  ClearQmailFiles = '[QmailFile] Clear QmailFiles'
}

export class LoadQmailFiles implements Action {
  readonly type = QmailFileActionTypes.LoadQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class LoadQmailFilesRequest implements Action {
  readonly type = QmailFileActionTypes.LoadQmailFilesRequest;

  constructor() {
  }
}

export class AddQmailFile implements Action {
  readonly type = QmailFileActionTypes.AddQmailFile;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class UpsertQmailFile implements Action {
  readonly type = QmailFileActionTypes.UpsertQmailFile;

  constructor(public payload: { qmailFile: QmailFile }) {
  }
}

export class AddQmailFiles implements Action {
  readonly type = QmailFileActionTypes.AddQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class UpsertQmailFiles implements Action {
  readonly type = QmailFileActionTypes.UpsertQmailFiles;

  constructor(public payload: { qmailFiles: QmailFile[] }) {
  }
}

export class UpdateQmailFile implements Action {
  readonly type = QmailFileActionTypes.UpdateQmailFile;

  constructor(public payload: { qmailFile: Update<QmailFile> }) {
  }
}

export class UpdateQmailFiles implements Action {
  readonly type = QmailFileActionTypes.UpdateQmailFiles;

  constructor(public payload: { qmailFiles: Update<QmailFile>[] }) {
  }
}

export class DeleteQmailFile implements Action {
  readonly type = QmailFileActionTypes.DeleteQmailFile;

  constructor(public payload: { id: string }) {
  }
}

export class DeleteQmailFiles implements Action {
  readonly type = QmailFileActionTypes.DeleteQmailFiles;

  constructor(public payload: { ids: string[] }) {
  }
}

export class ClearQmailFiles implements Action {
  readonly type = QmailFileActionTypes.ClearQmailFiles;
}

export type QmailFileActions =
  LoadQmailFiles
  | LoadQmailFilesRequest
  | AddQmailFile
  | UpsertQmailFile
  | AddQmailFiles
  | UpsertQmailFiles
  | UpdateQmailFile
  | UpdateQmailFiles
  | DeleteQmailFile
  | DeleteQmailFiles
  | ClearQmailFiles;
