import {Action, createReducer, on} from '@ngrx/store';
import {
  disconnectCurrentUser,
  disconnectCurrentUserSuccess,
  getCurrentUser,
  getCurrentUserUSuccess
} from "../actions/user.actions";
import {initialState, RootState} from "../rootState";
import {DomainUser} from "../../../domain/model/DomainUser";

export const ROOT_FEATURE_KEY = "root"
const reducer = createReducer<RootState, Action>(
  initialState,
  on(getCurrentUser, (state: RootState) => ({
    ...state,
  })),
  on(getCurrentUserUSuccess, (state: RootState, {user}) => ({
    ...state,
    user: user,
  })),
  on(disconnectCurrentUser, (state: RootState) => ({
    ...state,
  })),
  on(disconnectCurrentUserSuccess, (state: RootState) => ({
    ...state,
    user: {} as DomainUser,
  })),
);

export function userReducer(state: any, action: any) {
  return reducer(state, action);
}


