package com.cleverskills.domain

data class Income(
    val id: Long,
    val type: IncomeType,
    val name: String,
    val value: Long,
    val userId: String,
    val projectId: Long?,
)

