import {createSelector} from '@ngrx/store';
import {RootState, State} from "../rootState";

const selectRoot = (state: State) => state.root

export const isLoadingStateSelector = createSelector(selectRoot, (state: RootState) => state.isLoading);

export const selectProjects = createSelector(selectRoot, (state: RootState) => state.projects);
