package com.cleverskills.api.project

import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModel

@ApiModel("ApiCreateOrUpdateLcdProjectRequest",)
data class ApiCreateOrUpdateLcdProjectRequest(
    @JsonProperty("id") val id: Long? = null,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ApiLcdProjectInputs,
)


