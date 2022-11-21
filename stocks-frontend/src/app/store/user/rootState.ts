import {DomainUser} from "../../domain/model/DomainUser";
import {ActionReducer, MetaReducer} from "@ngrx/store";
import {ROOT_FEATURE_KEY} from "./reducers/user.reducer";

export interface SelfRootState {
  readonly [ROOT_FEATURE_KEY]: RootState
}

export interface RootState {
  user: DomainUser | null;
}

export const initialState: RootState = {
  user: {} as DomainUser
}

export const metaReducers : MetaReducer[] = [log]

function log(reducer: ActionReducer<SelfRootState>): ActionReducer<any> {
  return (state, action) => {
    const currrentState = reducer(state, action)

    console.groupCollapsed(action.type)
    console.log('Etat precedent:', state)
    console.log('Action:', action)
    console.log('Etat suivant:', currrentState)
    console.groupEnd()
    return currrentState
  }
}
