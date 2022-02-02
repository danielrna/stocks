import {ProjectInputs} from "./ProjectInputs";


export interface Project {
  id: string | null;
  type: ProjectType;
  ownerUid: string;
  updated: Date;
  name: string;
  inputs: ProjectInputs
}

export enum ProjectType {
  COLOC, LCD
}
