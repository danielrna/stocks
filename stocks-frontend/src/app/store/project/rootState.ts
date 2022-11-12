import {Project} from "../../domain/model/Project";

export interface State {
  root: RootState
};

export interface RootState {
  isLoading: boolean;
  projects: Project[];
};

export const initialState: RootState = {
  isLoading: false,
  projects: []
};

