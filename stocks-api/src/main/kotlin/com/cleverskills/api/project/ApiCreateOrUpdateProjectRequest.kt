package com.cleverskills.api.project

import com.cleverskills.domain.project.ProjectType
import com.fasterxml.jackson.annotation.JsonProperty
import io.swagger.annotations.ApiModel

@ApiModel("ApiUpdateProjectRequest", description = "Update a project")
data class ApiCreateOrUpdateProjectRequest(
    @JsonProperty("id") val id: Long?=null,
    @JsonProperty("type") val type: ProjectType,
    @JsonProperty("userId") val userId: String,
    @JsonProperty("name") val name: String,
    @JsonProperty("inputs") val inputs: ApiProjectInputs,
)


