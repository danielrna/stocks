package com.cleverskills.domain.project


data class ProjectInputs(
    val nbChambre: Long,
    val prixChambre: Long,
    val prix: Long,
    val travaux: Long,
    val apport: Long,
    val tauxCredit: Double,
    val dureeCredit: Long,
    val meubles: Long,
    val copro: Long,
    val impots: Long,
    val tf: Long,
    val pno: Long,
    val autre: Long,
    val cfe: Long,
    val entretien: Long,
    val chasse: Long,
    val vacance: Long,
    val id: Long?
)
