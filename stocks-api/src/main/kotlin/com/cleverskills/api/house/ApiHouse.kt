package com.cleverskills.api.house

import com.cleverskills.domain.house.HouseType
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate
import java.time.LocalDateTime

data class ApiHouse(
    @JsonProperty("id") val id: Long,
    @JsonProperty("type") val type: HouseType,
    @JsonProperty("name") val name: String,
    @JsonProperty("acquisitionPrice") val acquisitionPrice: Long,
    @JsonProperty("acquisitionDate") val acquisitionDate: LocalDate,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("projectId") val projectId: Long?,
)


