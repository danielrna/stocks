package com.cleverskills.domain.project

data class CreateOrUpdateProjectRequest(
    val id: Long? = null,
    val type: ProjectType,
    val userId: String,
    val name: String,
    val inputs: ProjectInputs
)

