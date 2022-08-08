package com.cleverskills.api

import com.fasterxml.jackson.annotation.JsonProperty
import java.util.*

data class ApiProject(
    @JsonProperty("id") val id: String,
    @JsonProperty("type") val type: ProjectType,
    @JsonProperty("ownerUid") val ownerUid: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ProjectInputs,
    @JsonProperty("createdDate") val createdDate: Date,
    @JsonProperty("upadatedDate") val upadatedDate: Date,
)


