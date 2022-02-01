import {ProjectInputs} from "./ProjectInputs";


export interface Project {
  uid: string;
  type: string;
  ownerUid: string;
  updated: Date;
  name: string;
  inputs: ProjectInputs
}
