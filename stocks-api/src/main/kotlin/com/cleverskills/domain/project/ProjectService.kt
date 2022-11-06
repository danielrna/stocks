package com.cleverskills.domain.project

import com.cleverskills.data.project.DBProject
import com.cleverskills.data.project.ProjectRepository
import com.cleverskills.domain.finance.FinanceService
import com.cleverskills.domain.income.CreateOrUpdateIncomeRequest
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
    suspend fun createOrUpdateProject(
        id: Long? = null, userId: String, name: String, inputs: ProjectInputs
    ): FullProject {
        val saved: DBProject = createOrUpdate(id, inputs, userId, name)

        val savedInputs = createOrUpdateLinkedInputs(saved, inputs)
        val project = saved.toFull(savedInputs)

        createOrUpdateLinkedIncome(project)
        createOrUpdateLinkedLoan(project)
        return project
    }

    private suspend fun createOrUpdate(
        id: Long?,
        inputs: ProjectInputs,
        userId: String,
        name: String
    ): DBProject {
        val existingProject: DBProject? = id?.let { projectRepository.findById(it).awaitFirst() }

        val projectType = when (inputs) {
            is ColocProjectInputs -> ProjectType.COLOC
            is LcdProjectInputs -> ProjectType.LCD
        }
        val saved: DBProject = projectRepository.save(
            DBProject(
                id = id,
                userId = userId,
                name = name,
                createdDate = existingProject?.createdDate ?: LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
                type = projectType,
            )
        ).awaitFirst()
        return saved
    }


    private suspend fun createOrUpdateLinkedInputs(
        project: DBProject, inputs: ProjectInputs
    ): ProjectInputs {
        val existingProjectInputs: ProjectInputs? = projectInputsService.findByProjectId(project.id!!)

        return projectInputsService.createOrUpdate(
            id = existingProjectInputs?.id, inputs = inputs.apply { projectId = project.id }
        )
    }

    private suspend fun createOrUpdateLinkedIncome(project: FullProject) {
        val existingIncome: Income? = incomeService.findByProjectId(project.id)

        incomeService.createOrUpdate(
            CreateOrUpdateIncomeRequest(
                id = existingIncome?.id,
                type = IncomeType.IMMO,
                userId = project.userId,
                name = "Revenu brut lié au projet '${project.name}'",
                value = project.outputs.monthlyRent,
                projectId = project.id
            )

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
        return project.toFull(inputs)
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

    internal suspend fun DBProject.toFull(inputs: ProjectInputs): FullProject {
        return FullProject(
            id = checkNotNull(id),
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
            project.toFull(inputs)
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

