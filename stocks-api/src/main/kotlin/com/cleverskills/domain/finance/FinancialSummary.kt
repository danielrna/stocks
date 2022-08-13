package com.cleverskills.domain.finance

data class FinancialSummary(
    val passiveTotalIncome: Long,
    val activeTotalIncome: Long,
    val debtRatio: Double
)
