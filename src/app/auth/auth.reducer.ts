import { AuthActions, AuthActionTypes } from './auth.actions';
import { createSelector } from '@ngrx/store';
import { RootState } from '../reducers';


export interface State {
  jwt: string;
}

const persistedJwt = localStorage.getItem('qmailo.jwt');
export const initialState: State = {
  jwt: persistedJwt
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCESS:
      const jwt = (<{payload}>action).payload.jwt;
      localStorage.setItem('qmailo.jwt', jwt);
      return {jwt};
    case AuthActionTypes.LOGOUT:
      localStorage.setItem('qmailo.jwt', null);
      return {jwt: null};
    default:
      return state;
  }
}

export const authSelector = (state: RootState) => state.auth;
export const jwtSelector = createSelector(authSelector, (state: State) => state.jwt);
