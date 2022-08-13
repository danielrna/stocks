package com.cleverskills.domain.project

data class ProjectOutputs(
    val monthlyExpenses: Long,
    val notaire: Long,
    val tfMensuelle: Long,
    val monthlyRent: Long,
    val totalEmprunte: Long,
    val cashflow: Long,
    val cashflowWithoutLoan: Long,
    val gestion: Long,
    val monthlyLoan: Long,
    val rendementBrut: Long,
    val rendementNet: Long,
)
