package com.cleverskills.domain

import com.cleverskills.api.ProjectInputs
import com.cleverskills.api.ProjectType
import com.cleverskills.data.ProjectRepository
import data.DBProject
import kotlinx.coroutines.reactive.awaitFirst
import org.springframework.stereotype.Service

@Service
class ProjectService(val projectRepository: ProjectRepository) {
    suspend fun create(type: ProjectType, ownerUid: String, name: String, inputs: ProjectInputs) {
        projectRepository.save(
            DBProject(null, ownerUid, name, type, "1323123")
        ).awaitFirst()
    }

    suspend fun get(id: Long): DBProject? {
        return projectRepository.findById(id).awaitFirst()
    }
}
