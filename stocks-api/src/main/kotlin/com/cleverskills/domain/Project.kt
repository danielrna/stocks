package com.cleverskills.domain

import com.cleverskills.api.ProjectType
import java.time.LocalDateTime

data class Project(
    val id: Long,
    val type: ProjectType,
    val ownerId: String,
    val name: String,
    val inputs: ProjectInputs,
    val createdDate: LocalDateTime,
    val upadatedDate: LocalDateTime,
)

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
    val vacance: Long
)
