import {createAction, props} from '@ngrx/store';
import {Project} from "../../../domain/model/Project";

export const getProjects = createAction('[Projects] Get Project list', props<{ userId: string }>(),)
export const getProjectsSuccess = createAction('[Projects] Get Project list Success', props<{ projects: Project[] }>())

export const deleteProject = createAction('[Projects] Delete Project', props<{ projectId: string }>(),)
export const deleteProjectSuccess = createAction('[Projects] Delete Project Success')
