package com.cleverskills.api.loan

import com.cleverskills.domain.loan.LoanType
import com.fasterxml.jackson.annotation.JsonProperty

data class ApiLoan(
    @JsonProperty("id") val id: Long,
    @JsonProperty("type") val type: LoanType,
    @JsonProperty("name") val name: String,
    @JsonProperty("value") val value: Long,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("projectId") val projectId: Long?,
)


