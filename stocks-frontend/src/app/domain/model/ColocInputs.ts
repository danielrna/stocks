export class ProjectInputs {
  constructor(prix: number,
              travaux: number,
              apport: number,
              loanRate: number,
              dureeCredit: number,
              meubles: number,
              copro: number,
              impots: number,
              tf: number,
              pno: number,
              autre: number,
              cfe: number,
              entretien: number,
              chasse: number) {
    this.prix = prix
    this.travaux = travaux
    this.apport = apport
    this.loanRate = loanRate
    this.dureeCredit = dureeCredit
    this.meubles = meubles
    this.copro = copro
    this.impots = impots
    this.tf = tf
    this.pno = pno
    this.autre = autre
    this.cfe = cfe
    this.entretien = entretien
    this.chasse = chasse
  }

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

export class ColocInputs extends ProjectInputs {
  constructor(nbChambre: number,
              prixChambre: number,
              vacance: number,
              inputs: ProjectInputs,
  ) {
    super(inputs.prix, inputs.travaux, inputs.apport, inputs.loanRate, inputs.dureeCredit, inputs.meubles, inputs.copro, inputs.impots, inputs.tf, inputs.pno, inputs.autre, inputs.cfe, inputs.entretien, inputs.chasse)

    this.nbChambre = nbChambre
    this.prixChambre = prixChambre
    this.vacance = vacance;
  }

  nbChambre: number
  prixChambre: number
  vacance: number

}

export class LcdInputs extends ProjectInputs {
  constructor(prixNuit: number,
              occupation: number,
              inputs: ProjectInputs) {
    super(inputs.prix, inputs.travaux, inputs.apport, inputs.loanRate, inputs.dureeCredit, inputs.meubles, inputs.copro, inputs.impots, inputs.tf, inputs.pno, inputs.autre, inputs.cfe, inputs.entretien, inputs.chasse)

    this.prixNuit = prixNuit
    this.occupation = occupation
  }

  prixNuit: number
  occupation: number
}

