package com.cleverskills.api.house

import com.cleverskills.domain.house.HouseType
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDate

data class ApiCreateOrUpdateHouseRequest(
    @JsonProperty("id") val id: Long? = null,
    @JsonProperty("type") val type: HouseType,
    @JsonProperty("name") val name: String,
    @JsonProperty("acquisitionPrice") val acquisitionPrice: Long,
    @JsonProperty("acquisitionDate") val acquisitionDate: LocalDate,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("city") val city: String,
    @JsonProperty("projectId") val projectId: Long? = null,
)


