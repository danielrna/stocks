package com.cleverskills.api

import com.fasterxml.jackson.annotation.JsonProperty

data class ApiCreateProjectRequest(
    @JsonProperty("name")
    val name: String,

    @JsonProperty("owner")
    val ownerId: String
)
