package com.cleverskills.api.project

import com.cleverskills.domain.ProjectType
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModel

@ApiModel("ApiCreateProjectRequest", description = "Create a task")
data class ApiCreateProjectRequest(
    @JsonProperty("type") val type: ProjectType,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ApiProjectInputs,
)


