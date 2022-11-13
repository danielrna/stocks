import {Action, createReducer, MetaReducer, on} from '@ngrx/store';
import {getCurrentUser, getCurrentUserUSuccess} from "../actions/user.actions";
import {initialState, RootState} from "../rootState";

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
);

export function userReducer(state: any, action: any) {
  return reducer(state, action);
}


