import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer as qMailReducer, State as QMailState } from '../qmail-file.reducer';
import { reducer as authReducer, State as AuthState } from '../auth/auth.reducer';

export interface RootState {
  qMailFiles: QMailState;
  auth: AuthState;
}

export const reducers: ActionReducerMap<RootState> = {
  qMailFiles: qMailReducer,
  auth: authReducer
};


export const metaReducers: MetaReducer<RootState>[] = !environment.production ? [] : [];
