package com.cleverskills.api

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiProjectInputs(
    @JsonProperty("nbChambre") val nbChambre: Long,
    @JsonProperty("prixChambre") val prixChambre: Long,
    @JsonProperty("prix") val prix: Long,
    @JsonProperty("travaux") val travaux: Long,
    @JsonProperty("apport") val apport: Long,
    @JsonProperty("tauxCredit") val tauxCredit: Double,
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
    @JsonProperty("vacance") val vacance: Long
)
