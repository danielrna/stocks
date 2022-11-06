export interface ColocInputs extends ProjectInputs {
  nbChambre: number
  prixChambre: number
  vacance: number
}

export interface LcdInputs extends ProjectInputs {
  prixNuit: number
  occupation: number
}

export interface ProjectInputs {
  prix: number
  travaux: number
  apport: number
  loanRate: number
  dureeCredit: number
  meubles: number
  copro: number
  impots: number
  tf: number
  pno: number
  autre: number
  cfe: number
  entretien: number
  chasse: number
}
