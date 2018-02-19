import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { QmailFile } from './qmail-file.model';
import { QmailFileActions, QmailFileActionTypes } from './qmail-file.actions';
import { RootState } from './reducers';
import { createSelector } from '@ngrx/store';

export interface State extends EntityState<QmailFile> {
  // additional entities state properties
  isLoading: boolean;
  hasError: boolean;
}

export const adapter: EntityAdapter<QmailFile> = createEntityAdapter<QmailFile>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  isLoading: false,
  hasError: false
});

export function reducer(state = initialState,
                        action: QmailFileActions): State {
  switch (action.type) {
    case QmailFileActionTypes.AddQmailFile: {
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
      return adapter.updateOne((<any>action).payload.qmailFile, state);
    }

    case QmailFileActionTypes.UpdateQmailFiles: {
      return adapter.updateMany((<any>action).payload.qmailFiles, state);
    }

    case QmailFileActionTypes.DeleteQmailFile: {
      return adapter.removeOne((<any>action).payload.id, state);
    }

    case QmailFileActionTypes.DeleteQmailFiles: {
      return adapter.removeMany((<any>action).payload.ids, state);
    }

    case QmailFileActionTypes.LoadQmailFiles: {
      return adapter.addAll((<any>action).payload.qmailFiles, state);
    }

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

export const selectQMailFiles = (state: RootState) => state.qMailFiles;
export const selectAllFiles = createSelector(selectQMailFiles, selectAll);
