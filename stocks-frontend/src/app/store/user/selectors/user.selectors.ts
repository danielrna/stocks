import {createFeatureSelector, createSelector} from '@ngrx/store';
import {RootState} from "../rootState";
import {ROOT_FEATURE_KEY} from "../reducers/user.reducer";

// const selectRoot = (state: SelfRootState) => state.root
const selectRoot = createFeatureSelector<RootState>(ROOT_FEATURE_KEY)


export const selectUser = createSelector(selectRoot, (state: RootState) => state.user);
