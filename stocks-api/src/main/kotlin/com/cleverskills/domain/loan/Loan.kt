package com.cleverskills.domain.loan

data class Loan(
    val id: Long,
    val type: LoanType,
    val name: String,
    val value: Long,
    val userId: String,
    val projectId: Long?,
)

