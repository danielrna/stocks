package com.cleverskills.domain

import com.cleverskills.api.ApiProjectInputs
import com.cleverskills.api.ProjectType
import com.cleverskills.data.ProjectRepository
import data.DBProject
import kotlinx.coroutines.reactive.awaitFirst
import org.springframework.stereotype.Service

@Service
class ProjectService(val projectRepository: ProjectRepository) {
    suspend fun create(type: ProjectType, ownerUid: String, name: String, inputs: ApiProjectInputs): Project {
        return projectRepository.save(
            DBProject(null, ownerUid, name, type, "1323123")
        ).awaitFirst().toDomain()
    }

    suspend fun get(id: Long): DBProject? {
        return projectRepository.findById(id).awaitFirst()
    }

    private fun DBProject.toDomain(): Project {
        return Project(
            id = id ?: throw IllegalStateException(""),
            type = type,
            ownerId = ownerId,
            name = name,
            createdDate = createdDate,
            upadatedDate = updatedDate,
            inputs = ProjectInputs(
                nbChambre = 0,
                prixChambre = 0,
                prix = 0,
                travaux = 0,
                apport = 0,
                tauxCredit = 0,
                dureeCredit = 0,
                meubles = 0,
                copro = 0,
                impots = 0,
                tf = 0,
                pno = 0,
                autre = 0,
                cfe = 0,
                entretien = 0,
                chasse = 0,
                vacance = 0
            ) // FIXME
        )

    }
}
