package com.cleverskills.api

import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class ApiProject(
    @JsonProperty("id") val id: Long,
    @JsonProperty("type") val type: ProjectType,
    @JsonProperty("ownerUid") val ownerId: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ApiProjectInputs?,
    @JsonProperty("createdDate") val createdDate: LocalDateTime,
    @JsonProperty("upadatedDate") val upadatedDate: LocalDateTime,
)



