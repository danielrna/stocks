package com.cleverskills.domain.income

data class CreateOrUpdateIncomeRequest(
    val id: Long? = null,
    val type: IncomeType,
    val userId: String,
    val name: String,
    val value: Long,
    val projectId: Long? = null
)
