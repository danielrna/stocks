package com.cleverskills.api.finance

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiFinancialSummary(
    @JsonProperty("passiveTotalIncome") val passiveTotalIncome: Long,
    @JsonProperty("activeTotalIncome") val activeTotalIncome: Long,
    @JsonProperty("debtRate") val debtRate: Double
)
