import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { QmailFile } from './qmail-file.model';
import { QmailFileActionTypes } from './qmail-file.actions';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';

export interface FileState extends EntityState<QmailFile> {
  // additional entities state properties
  isLoading: boolean;
  isSaving: boolean;
}

export const adapter: EntityAdapter<QmailFile> = createEntityAdapter<QmailFile>();

export const initialState: FileState = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  isSaving: false
});

export function reducer(state = initialState,
                        action: Action): FileState {
  switch (action.type) {

    case QmailFileActionTypes.AddQmailFileRequest:
    case QmailFileActionTypes.UpdateQmailFileRequest:
    case QmailFileActionTypes.DeleteQmailFileRequest:
      return Object.assign({}, state, {isSaving: true});

    case QmailFileActionTypes.AddQmailFileFailed:
    case QmailFileActionTypes.UpdateQmailFileFailed:
    case QmailFileActionTypes.DeleteQmailFileFailed:
      return Object.assign({}, state, {isSaving: false});

    case QmailFileActionTypes.AddQmailFile: {
      state = Object.assign({}, state, {isSaving: false});
      return adapter.addOne((<any>action).payload.qmailFile, state);
    }

    case QmailFileActionTypes.UpsertQmailFile: {
      return adapter.upsertOne((<any>action).payload.qmailFile, state);
    }

    case QmailFileActionTypes.AddQmailFiles: {
      return adapter.addMany((<any>action).payload.qmailFiles, state);
    }

    case QmailFileActionTypes.UpsertQmailFiles: {
      return adapter.upsertMany((<any>action).payload.qmailFiles, state);
    }

    case QmailFileActionTypes.UpdateQmailFile: {
      state = Object.assign({}, state, {isSaving: false});
      return adapter.updateOne((<any>action).payload.qmailFile, state);
    }

    case QmailFileActionTypes.UpdateQmailFiles: {
      return adapter.updateMany((<any>action).payload.qmailFiles, state);
    }

    case QmailFileActionTypes.DeleteQmailFile: {
      state = Object.assign({}, state, {isSaving: false});
      return adapter.removeOne((<any>action).payload.id, state);
    }

    case QmailFileActionTypes.DeleteQmailFiles: {
      return adapter.removeMany((<any>action).payload.ids, state);
    }

    case QmailFileActionTypes.LoadQmailFiles: {
      state = Object.assign({}, state, {isLoading: false});
      return adapter.addAll((<any>action).payload.qmailFiles, state);
    }

    case QmailFileActionTypes.LoadQmailFilesRequest:
      return Object.assign({}, state, {isLoading: true});

    case QmailFileActionTypes.LoadQmailFilesFailed:
      return Object.assign({}, state, {isLoading: false});

    case QmailFileActionTypes.ClearQmailFiles: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export const selectQMailFiles = createFeatureSelector<FileState>('files');
export const selectAllFiles = createSelector(selectQMailFiles, selectAll);

export const selectIsLoading = createSelector(selectQMailFiles, state => state.isLoading);
export const selectIsSaving = createSelector(selectQMailFiles, state => state.isSaving);

export const selectById = id => createSelector(selectAllFiles, files => files.find(f => f.id === id));
