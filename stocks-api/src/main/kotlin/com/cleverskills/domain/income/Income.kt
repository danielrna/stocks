package com.cleverskills.domain.income

data class Income(
    val id: Long,
    val type: IncomeType,
    val name: String,
    val value: Long,
    val userId: String,
    val projectId: Long?,
)

