package com.cleverskills.domain

import com.cleverskills.api.ProjectType
import java.time.LocalDateTime

data class Project(
    val id: Long,
    val type: ProjectType,
    val userId: String,
    val name: String,
    val inputs: ProjectInputs?,
    val outputs: ProjectOutputs?,
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

data class ProjectOutputs(
    val monthlyExpenses: Long,
    val notaire: Long,
    val tfMensuelle: Long,
    val monthlyRent: Long,
    val totalEmprunte: Long,
    val cashflow: Long,
    val cashflowNoCredit: Long,
    val gestion: Long,
    val mensualiteCredit: Long,
    val rendementBrut: Long,
    val rendementNet: Long,
)
