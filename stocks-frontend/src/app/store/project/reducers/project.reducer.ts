import {Action, ActionReducer, createReducer, on} from '@ngrx/store';
import {getProjects, getProjectsSuccess} from "../actions/project.actions";
import {initialState, RootState, State} from "../rootState";


const reducer = createReducer<RootState, Action>(
  initialState,
  on(getProjects, (state: RootState) => ({
    ...state,
    projects: state.projects,
  })),
  on(getProjectsSuccess, (state: RootState, {projects}) => ({
    ...state,
    projects: projects,
  })),
);

export function projectReducer(state: any, action: any) {
  return reducer(state, action);
}

function log(reducer: ActionReducer<State>): ActionReducer<any> {
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
