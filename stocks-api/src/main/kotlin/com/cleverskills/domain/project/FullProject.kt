package com.cleverskills.domain.project

import java.time.LocalDateTime

data class FullProject(
    val id: Long,
    val type: ProjectType,
    val userId: String,
    val name: String,
    val inputs: ProjectInputs,
    val outputs: ProjectOutputs,
    val createdDate: LocalDateTime,
    val updatedDate: LocalDateTime,
)

