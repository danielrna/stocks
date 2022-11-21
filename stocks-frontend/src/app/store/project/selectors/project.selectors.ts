import {createSelector} from '@ngrx/store';
import {ProjectState, SelfProjectState} from "../projectState";

const selectSelf = (state: SelfProjectState) => state.projects

export const selectProjects = createSelector(selectSelf, (state: ProjectState) => state.projects);
