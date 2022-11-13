import {Action, createReducer, on} from '@ngrx/store';
import {deleteProjectSuccess, getProjects, getProjectsSuccess} from "../actions/project.actions";
import {initialProjectState, ProjectState} from "../projectState";
export const PROJECT_FEATURE_KEY = "projects"


const reducer = createReducer<ProjectState, Action>(
  initialProjectState,
  on(getProjects, (state: ProjectState) => ({
    ...state,
    projects: state.projects,
  })),
  on(getProjectsSuccess, (state: ProjectState, {projects}) => ({
    ...state,
    projects: projects,
  })),
  on(deleteProjectSuccess, (state: ProjectState, {projectId}) => ({
    ...state,
    projects: state.projects.filter(it => it.id!!.toString() !== projectId),
  })),
);

export function projectReducer(state: any, action: any) {
  return reducer(state, action);
}
