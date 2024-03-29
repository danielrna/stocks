package com.cleverskills.api.project

import com.fasterxml.jackson.annotation.JsonProperty

sealed class ApiProjectInputs()
data class ApiLcdProjectInputs(
    @JsonProperty("prixNuit") val prixNuit: Long,
    @JsonProperty("occupation") val occupation: Long,

    @JsonProperty("prix") val prix: Long,
    @JsonProperty("travaux") val travaux: Long,
    @JsonProperty("apport") val apport: Long,
    @JsonProperty("loanRate") val loanRate: Double,
    @JsonProperty("dureeCredit") val dureeCredit: Long,
    @JsonProperty("meubles") val meubles: Long,
    @JsonProperty("copro") val copro: Long,
    @JsonProperty("impots") val impots: Long,
    @JsonProperty("tf") val tf: Long,
    @JsonProperty("pno") val pno: Long,
    @JsonProperty("autre") val autre: Long,
    @JsonProperty("cfe") val cfe: Long,
    @JsonProperty("entretien") val entretien: Long,
    @JsonProperty("chasse") val chasse: Long,

    ) : ApiProjectInputs()

data class ApiColocProjectInputs(
    @JsonProperty("nbChambre") val nbChambre: Long,
    @JsonProperty("prixChambre") val prixChambre: Long,
    @JsonProperty("vacance") val vacance: Long,

    @JsonProperty("prix") val prix: Long,
    @JsonProperty("travaux") val travaux: Long,
    @JsonProperty("apport") val apport: Long,
    @JsonProperty("loanRate") val loanRate: Double,
    @JsonProperty("dureeCredit") val dureeCredit: Long,
    @JsonProperty("meubles") val meubles: Long,
    @JsonProperty("copro") val copro: Long,
    @JsonProperty("impots") val impots: Long,
    @JsonProperty("tf") val tf: Long,
    @JsonProperty("pno") val pno: Long,
    @JsonProperty("autre") val autre: Long,
    @JsonProperty("cfe") val cfe: Long,
    @JsonProperty("entretien") val entretien: Long,
    @JsonProperty("chasse") val chasse: Long,
) : ApiProjectInputs()
