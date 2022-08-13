package com.cleverskills.domain

import com.cleverskills.data.DBProject
import com.cleverskills.data.ProjectRepository
import kotlinx.coroutines.Deferred
import kotlinx.coroutines.async
import kotlinx.coroutines.awaitAll
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class ProjectService(
    val projectRepository: ProjectRepository,
    val projectInputsService: ProjectInputsService,
    val incomeService: IncomeService,
    val rentaService: RentaService
) {
    suspend fun createOrUpdate(
        id: Long? = null,
        type: ProjectType,
        userId: String,
        name: String,
        inputs: ProjectInputs
    ): Project {
        val existingProject: DBProject? = id?.let { projectRepository.findById(it).awaitFirst() }

        val savedInputs = createOrUpdateLinkedInputs(existingProject, inputs)

        val project: Project = projectRepository.save(
            DBProject(
                id = id,
                userId = userId,
                name = name,
                type = type,
                inputsId = savedInputs.id!!,
                createdDate = existingProject?.createdDate ?: LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
            )
        ).awaitFirst().toDomain(savedInputs)
        createOrUpdateLinkedIncome(project)
        return project
    }

    private suspend fun createOrUpdateLinkedInputs(
        existingProject: DBProject?,
        inputs: ProjectInputs
    ) = projectInputsService.createOrUpdate(existingProject?.inputsId, inputs)

    private suspend fun createOrUpdateLinkedIncome(project: Project) {
        val existingIncome: Income? = incomeService.findByProjectId(project.id)

        incomeService.createOrUpdate(
            id = existingIncome?.id,
            type = IncomeType.IMMO,
            userId = project.userId,
            name = "Revenu lié au projet '${project.name}'",
            value = project.outputs.cashflowAfterCredit,
            projectId = project.id
        )
    }

    suspend fun get(id: Long): Project? {
        val project = projectRepository.findById(id).awaitFirst()
        val inputs = projectInputsService.getNotNull(project.inputsId)
        return project.toDomain(inputs)
    }


    internal suspend fun DBProject.toDomain(inputs: ProjectInputs): Project {
        return Project(
            id = checkNotNull(id) ,
            type = type,
            userId = userId,
            name = name,
            createdDate = createdDate,
            upadatedDate = updatedDate,
            inputs = inputs,
            outputs = calculateOutputs(inputs)
        )

    }

    suspend fun findByUserId(userId: String): List<Project> {

        val projects = projectRepository.findAllByUserId(userId).collectList().awaitFirst()

        val deferred: List<Deferred<Pair<Long?, ProjectInputs>>> = projects.map {
            coroutineScope {
                async {
                    it.id to projectInputsService.getNotNull(it.inputsId)
                }
            }
        }
        val pairs = deferred.awaitAll()
        return projects.map { project ->
            val inputs: ProjectInputs = pairs.filter { it.first == project.id }.firstNotNullOf { it.second }
            project.toDomain(inputs)
        }
    }

    suspend fun deleteById(id: Long) {
        val project = projectRepository.findById(id).awaitFirst()
        projectInputsService.delete(project.inputsId)
        projectRepository.deleteById(id).awaitFirstOrNull()
    }

    suspend fun calculateOutputs(inputs: ProjectInputs): ProjectOutputs {
        return rentaService.calculateOutputs(inputs)
    }


}
