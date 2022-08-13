package com.cleverskills.api.project

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiProjectOutputs(
    @JsonProperty("monthlyExpenses") val monthlyExpenses: Long,
    @JsonProperty("notaire") val notaire: Long,
    @JsonProperty("tfMensuelle") val tfMensuelle: Long,
    @JsonProperty("monthlyRent") val monthlyRent: Long,
    @JsonProperty("totalEmprunte") val totalEmprunte: Long,
    @JsonProperty("cashflow") val cashflow: Long,
    @JsonProperty("cashflowAfterCredit") val cashflowAfterCredit: Long,
    @JsonProperty("gestion") val gestion: Long,
    @JsonProperty("creditMensuel") val creditMensuel: Long,
    @JsonProperty("rendementBrut") val rendementBrut: Long,
    @JsonProperty("rendementNet") val rendementNet: Long,
)
