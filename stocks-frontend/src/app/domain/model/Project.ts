import {ProjectInputs} from "./ProjectInputs";
import {ProjectOutputs} from "./ProjectOutputs";

//
// export interface Project {
//   id: string;
//   type: ProjectType;
//   userId: string;
//   updated: number;
//   name: string;
//   inputs: ProjectInputs,
//   outputs: ProjectOutputs,
// }

export interface Project {
  id: null | number;
  type: ProjectType;
  userId: string;
  updated: number;
  name: string;
  inputs: ProjectInputs,
  outputs: ProjectOutputs,
}

export enum ProjectType {
  Colocation,
  LCD,
  IDR,
}
