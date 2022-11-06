import {ColocInputs, LcdInputs, ProjectInputs} from "./ColocInputs";
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
  COLOC,
  LCD,
  IDR,
}

export const dummyColocProject = <Project>{
  id: null,
  type: ProjectType.COLOC,
  userId: "",
  updated: Date.now(),
  name: "Nouvelle Coloc",
  inputs: <ColocInputs>{
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
export const dummyLcdProject = <Project>{
  id: null,
  type: ProjectType.LCD,
  userId: "",
  updated: Date.now(),
  name: "Nouvelle LCD",
  inputs: <LcdInputs>{
    prixNuit: 3,
    occupation: 70,
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
  },
  outputs: <ProjectOutputs>{}
}
