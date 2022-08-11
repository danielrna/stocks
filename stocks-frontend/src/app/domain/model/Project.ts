import {ProjectInputs} from "./ProjectInputs";


export interface Project {
  id: string | null;
  type: ProjectType;
  ownerId: string;
  updated: number;
  name: string;
  inputs: ProjectInputs,
}

export enum ProjectType {
  Colocation,
  LCD,
  IDR,
}
