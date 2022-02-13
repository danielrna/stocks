import {ProjectInputs} from "./ProjectInputs";


export interface Project {
  id: string | null;
  type: ProjectType;
  ownerUid: string;
  updated: number;
  name: string;
  inputs: ProjectInputs,
}

export enum ProjectType {
  Colocation,
  LCD,
  IDR,
}
