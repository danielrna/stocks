package com.cleverskills.api.income

import com.cleverskills.domain.income.IncomeType
import com.fasterxml.jackson.annotation.JsonProperty

data class ApiCreateOrUpdateIncomeRequest(
    @JsonProperty("id") val id: Long?=null,
    @JsonProperty("type") val type: IncomeType,
    @JsonProperty("name") val name: String,
    @JsonProperty("value") val value: Long,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("projectId") val projectId: Long?=null,
)


