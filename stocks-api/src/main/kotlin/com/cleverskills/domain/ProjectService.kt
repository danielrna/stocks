package com.cleverskills.domain

import com.cleverskills.api.ApiProjectInputs
import com.cleverskills.api.ProjectType
import com.cleverskills.data.ProjectInputsRepository
import com.cleverskills.data.ProjectRepository
import data.DBProject
import data.DBProjectInputs
import kotlinx.coroutines.reactive.awaitFirst
import org.springframework.stereotype.Service

@Service
class ProjectService(val projectRepository: ProjectRepository, val projectInputsRepository: ProjectInputsRepository) {
    suspend fun create(type: ProjectType, ownerUid: String, name: String, inputs: ApiProjectInputs): Project {
        val inputs = projectInputsRepository.save(
            DBProjectInputs(
                null,
                inputs.nbChambre,
                inputs.prixChambre,
                inputs.prix,
                inputs.travaux,
                inputs.apport,
                inputs.tauxCredit,
                inputs.dureeCredit,
                inputs.meubles,
                inputs.copro,
                inputs.impots,
                inputs.tf,
                inputs.pno,
                inputs.autre,
                inputs.cfe,
                inputs.entretien,
                inputs.chasse,
                inputs.vacance
            )
        ).awaitFirst()
        val project = projectRepository.save(
            DBProject(null, ownerUid, name, type, inputs.id)
        ).awaitFirst()
        return project.toDomain(inputs)
    }

    suspend fun get(id: Long): Project? {
        val project = projectRepository.findById(id).awaitFirst()
        val inputs = projectInputsRepository.findById(project.inputsId).awaitFirst()
        return project.toDomain(inputs)
    }

    private fun DBProject.toDomain(inputs: DBProjectInputs): Project {
        return Project(
            id = id ?: throw IllegalStateException(""),
            type = type,
            ownerId = ownerId,
            name = name,
            createdDate = createdDate,
            upadatedDate = updatedDate,
            inputs = inputs.toDomain()
        )

    }
}

private fun DBProjectInputs.toDomain(): ProjectInputs {
    return ProjectInputs(
        nbChambre = nbChambre,
        prixChambre = prixChambre,
        prix = prix,
        travaux = travaux,
        apport = apport,
        tauxCredit = tauxCredit,
        dureeCredit = dureeCredit,
        meubles = meubles,
        copro = copro,
        impots = impots,
        tf = tf,
        pno = pno,
        autre = autre,
        cfe = cfe,
        entretien = entretien,
        chasse = chasse,
        vacance = vacance,
        id = id!!,
    )
}
