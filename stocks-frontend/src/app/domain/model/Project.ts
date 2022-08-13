import {ProjectInputs} from "./ProjectInputs";
import {ProjectOutputs} from "./ProjectOutputs";


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

export const placeHolderProject = <Project>{
  id: null,
  type: ProjectType.Colocation,
  userId: "",
  updated: Date.now(),
  name: "Nouveau Projet",
  inputs: <ProjectInputs>{
    nbChambre: 3,
    prixChambre: 300,
    prix: 90000,
    travaux: 0,
    apport: 10000,
    loanRate: 1,
    dureeCredit: 25,
    meubles: 10000,
    copro: 0,
    impots: 10,
    tf: 1500,
    pno: 30,
    autre: 0,
    cfe: 30,
    entretien: 0,
    chasse: 0,
    vacance: 1.5,
  },
  outputs: <ProjectOutputs>{}
}
