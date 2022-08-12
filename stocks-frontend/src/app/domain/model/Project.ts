import {ProjectInputs} from "./ProjectInputs";
import {ProjectOutputs} from "./ProjectOutputs";


export interface Project {
  id: string;
  type: ProjectType;
  ownerId: string;
  updated: number;
  name: string;
  inputs: ProjectInputs,
  outputs: ProjectOutputs,
}

export interface CreateProjectRequest {
  id: null;
  type: ProjectType;
  ownerId: string;
  updated: number;
  name: string;
  inputs: ProjectInputs,
  outputs: null,
}

export enum ProjectType {
  Colocation,
  LCD,
  IDR,
}
