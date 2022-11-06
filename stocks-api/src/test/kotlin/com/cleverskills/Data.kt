package com.cleverskills

import com.cleverskills.domain.project.ProjectInputs
import com.cleverskills.domain.project.ProjectOutputs

val defaultInputs = ProjectInputs(
    nbChambre = 0,
    prixChambre = 0,
    prix = 0,
    travaux = 0,
    apport = 0,
    loanRate = 0.0,
    dureeCredit = 0,
    meubles = 0,
    copro = 0,
    impots = 0,
    tf = 0,
    pno = 0,
    autre = 0,
    cfe = 0,
    entretien = 0,
    chasse = 0,
    vacance = 0,
    projectId = null,
    id = null
)
val defaultOutputs = ProjectOutputs(
    notaire = 0,
    tfMensuelle = 0,
    monthlyRent = 0,
    totalEmprunte = 0,
    cashflow = 0,
    cashflowWithoutLoan = 0,
    gestion = 0,
    monthlyLoan = 0,
    rendementBrut = 0.0,
    rendementNet = 0.0, monthlyExpenses = 0
)
