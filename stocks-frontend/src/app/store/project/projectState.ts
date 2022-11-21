import {Project} from "../../domain/model/Project";
import {PROJECT_FEATURE_KEY} from "./reducers/project.reducer";

export interface SelfProjectState {
  [PROJECT_FEATURE_KEY]: ProjectState;
}

export interface ProjectState {
  projects: Project[];
}

export const initialProjectState: ProjectState = {
  projects: []
}
