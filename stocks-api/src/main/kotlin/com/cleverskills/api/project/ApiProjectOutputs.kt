package com.cleverskills.api.project

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiProjectOutputs(
    @JsonProperty("monthlyExpenses") val monthlyExpenses: Long,
    @JsonProperty("notaire") val notaire: Long,
    @JsonProperty("tfMensuelle") val tfMensuelle: Long,
    @JsonProperty("monthlyRent") val monthlyRent: Long,
    @JsonProperty("totalEmprunte") val totalEmprunte: Long,
    @JsonProperty("cashflow") val cashflow: Long,
    @JsonProperty("cashflowWithoutLoan") val cashflowWithoutLoan: Long,
    @JsonProperty("gestion") val gestion: Long,
    @JsonProperty("monthlyLoan") val monthlyLoan: Long,
    @JsonProperty("rendementBrut") val rendementBrut: Double,
    @JsonProperty("rendementNet") val rendementNet: Double,
)
