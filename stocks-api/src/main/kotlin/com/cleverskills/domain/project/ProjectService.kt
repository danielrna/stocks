package com.cleverskills.domain.project

import com.cleverskills.data.DBProject
import com.cleverskills.data.ProjectRepository
import com.cleverskills.domain.finance.FinanceService
import com.cleverskills.domain.income.Income
import com.cleverskills.domain.income.IncomeService
import com.cleverskills.domain.income.IncomeType
import com.cleverskills.domain.loan.Loan
import com.cleverskills.domain.loan.LoanService
import com.cleverskills.domain.loan.LoanType
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
    val loanService: LoanService,
    val financeService: FinanceService
) {
    suspend fun createOrUpdate(
        id: Long? = null, type: ProjectType, userId: String, name: String, inputs: ProjectInputs
    ): FullProject {
        val existingProject: DBProject? = id?.let { projectRepository.findById(it).awaitFirst() }


        val saved: DBProject = projectRepository.save(
            DBProject(
                id = id,
                userId = userId,
                name = name,
                createdDate = existingProject?.createdDate ?: LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
                type = type,
            )
        ).awaitFirst()

        val savedInputs = createOrUpdateLinkedInputs(saved, inputs)
        val project = saved.toDomain().toFull(savedInputs)

        createOrUpdateLinkedIncome(project)
        createOrUpdateLinkedLoan(project)
        return project
    }

    private suspend fun createOrUpdateLinkedInputs(
        project: DBProject, inputs: ProjectInputs
    ): ProjectInputs {
        val existingProjectInputs: ProjectInputs? = projectInputsService.findByProjectId(project.id!!)

        return projectInputsService.createOrUpdate(
            id = existingProjectInputs?.id,
            inputs = inputs.copy(projectId = project.id)
        )
    }

    private suspend fun createOrUpdateLinkedIncome(project: FullProject) {
        val existingIncome: Income? = incomeService.findByProjectId(project.id)

        incomeService.createOrUpdate(
            id = existingIncome?.id,
            type = IncomeType.IMMO,
            userId = project.userId,
            name = "Revenu lié au projet '${project.name}'",
            value = project.outputs.cashflowWithoutLoan,
            projectId = project.id
        )
    }

    private suspend fun createOrUpdateLinkedLoan(project: FullProject) {
        val existingLoan: Loan? = loanService.findByProjectId(project.id)

        loanService.createOrUpdate(
            id = existingLoan?.id,
            type = LoanType.LOCATIF,
            userId = project.userId,
            name = "Crédit lié au projet '${project.name}'",
            value = project.outputs.monthlyLoan,
            projectId = project.id
        )
    }

    suspend fun get(id: Long): FullProject? {
        val project = projectRepository.findById(id).awaitFirst()
        val inputs = projectInputsService.findByProjectId(project.id!!) ?: throw IllegalStateException("")
        return project.toDomain().toFull(inputs)
    }


    internal suspend fun DBProject.toDomain(): Project {
        return Project(
            id = checkNotNull(id),
            type = type,
            userId = userId,
            name = name,
            createdDate = createdDate,
            updatedDate = updatedDate,
        )
    }

    internal suspend fun Project.toFull(inputs: ProjectInputs): FullProject {
        return FullProject(
            id = id,
            type = type,
            userId = userId,
            name = name,
            createdDate = createdDate,
            updatedDate = updatedDate,
            inputs = inputs,
            outputs = calculateOutputs(inputs)
        )


    }

    suspend fun findByUserId(userId: String): List<FullProject> {

        val projects = projectRepository.findAllByUserId(userId).collectList().awaitFirst()

        val deferred: List<Deferred<Pair<Long?, ProjectInputs>>> = projects.map {
            coroutineScope {
                async {
                    it.id to (projectInputsService.findByProjectId(it.id!!)
                        ?: throw IllegalStateException("Project has no matching inputs"))
                }
            }
        }
        val pairs = deferred.awaitAll()
        return projects.map { project ->
            val inputs: ProjectInputs = pairs.filter { it.first == project.id }.firstNotNullOf { it.second }
            project.toDomain().toFull(inputs)
        }
    }

    suspend fun deleteById(id: Long) {
        projectRepository.deleteById(id).awaitFirstOrNull()
        projectInputsService.deleteByProjectId(id)
        incomeService.deleteByProjectId(id)
        loanService.deleteByProjectId(id)
    }

    suspend fun calculateOutputs(inputs: ProjectInputs): ProjectOutputs {
        return financeService.calculateProjectOutputs(inputs)
    }

}

