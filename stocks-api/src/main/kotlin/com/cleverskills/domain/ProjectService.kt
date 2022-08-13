package com.cleverskills.domain

import com.cleverskills.api.ProjectType
import com.cleverskills.data.ProjectInputsRepository
import com.cleverskills.data.ProjectRepository
import data.DBProject
import data.DBProjectInputs
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service

@Service
class ProjectService(
    val projectRepository: ProjectRepository,
    val projectInputsRepository: ProjectInputsRepository,
    val rentaService: RentaService
) {
    suspend fun createOrUpdate(
        id: Long? = null, type: ProjectType, userId: String, name: String, inputs: ProjectInputs
    ): Project {
        val existingProject: DBProject? = id?.let { projectRepository.findById(it).awaitFirst() }

        val saved: DBProjectInputs = projectInputsRepository.save(inputs.toDB(existingProject?.inputsId)).awaitFirst()

        val project: DBProject =
            projectRepository.save(DBProject(id, userId, name, type, saved.id, existingProject?.createdDate))
                .awaitFirst()

        return project.toDomain(saved)
    }

    suspend fun get(id: Long): Project? {
        val project = projectRepository.findById(id).awaitFirst()
        val inputs = projectInputsRepository.findById(project.inputsId).awaitFirst()
        return project.toDomain(inputs)
    }


    private fun ProjectInputs.toDB(id: Long? = null) = DBProjectInputs(
        id,
        this.nbChambre,
        this.prixChambre,
        this.prix,
        this.travaux,
        this.apport,
        this.tauxCredit,
        this.dureeCredit,
        this.meubles,
        this.copro,
        this.impots,
        this.tf,
        this.pno,
        this.autre,
        this.cfe,
        this.entretien,
        this.chasse,
        this.vacance
    )

    private suspend fun DBProject.toDomain(inputs: DBProjectInputs?): Project {
        val domainInputs = inputs?.toDomain()
        return Project(id = id ?: throw IllegalStateException(""),
            type = type,
            userId = userId,
            name = name,
            createdDate = createdDate,
            upadatedDate = updatedDate,
            inputs = domainInputs,
            outputs = domainInputs?.let { calculateOutputs(it) })

    }

    suspend fun findByUserId(userId: String): List<Project> {

        val projects = projectRepository.findAllByUserId(userId).collectList().awaitFirst()

        val deferred: List<Deferred<Pair<Long?, DBProjectInputs>>> = projects.map {
            coroutineScope {
                async {
                    it.id to projectInputsRepository.findById(it.inputsId).awaitFirst()
                }
            }
        }
        val pairs = deferred.awaitAll()
        return projects.map { project ->
            val inputs: DBProjectInputs? = pairs.find { it.first == project.id }?.second
            project.toDomain(inputs)
        }
    }

    suspend fun deleteById(id: Long) {
        val project = projectRepository.findById(id).awaitFirst()
        projectInputsRepository.deleteById(project.inputsId).awaitFirstOrNull()
        projectRepository.deleteById(id).awaitFirstOrNull()
    }

    suspend fun calculateOutputs(inputs: ProjectInputs): ProjectOutputs {
        return rentaService.calculateOutputs(inputs)
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
        )
    }
}
