package com.cleverskills.api.project

import com.cleverskills.domain.ProjectType
import com.fasterxml.jackson.annotation.JsonProperty
import java.time.LocalDateTime

data class ApiProject(
    @JsonProperty("id") val id: Long,
    @JsonProperty("type") val type: ProjectType,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ApiProjectInputs?,
    @JsonProperty("outputs") val outputs: ApiProjectOutputs?,
    @JsonProperty("createdDate") val createdDate: LocalDateTime,
    @JsonProperty("upadatedDate") val upadatedDate: LocalDateTime,
)



