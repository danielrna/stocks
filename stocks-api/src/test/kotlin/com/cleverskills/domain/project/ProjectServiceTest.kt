package com.cleverskills.domain.project

import com.cleverskills.data.project.DBProject
import com.cleverskills.data.project.ProjectRepository
import com.cleverskills.defaultInputs
import com.cleverskills.defaultOutputs
import com.cleverskills.domain.finance.FinanceService
import com.cleverskills.domain.income.IncomeService
import com.cleverskills.domain.loan.LoanService
import io.mockk.coEvery
import io.mockk.impl.annotations.InjectMockKs
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.mockk
import kotlinx.coroutines.runBlocking
import org.assertj.core.api.Assertions.assertThat
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import reactor.core.publisher.Mono
import java.time.LocalDateTime

@ExtendWith(MockKExtension::class)
internal class ProjectServiceTest {
    @MockK
    private lateinit var projectRepository: ProjectRepository

    @MockK
    private lateinit var projectInputsService: ProjectInputsService

    @MockK
    private lateinit var incomeService: IncomeService

    @MockK
    private lateinit var loanService: LoanService

    @MockK
    private lateinit var financeService: FinanceService

    @InjectMockKs
    private lateinit var projectService: ProjectService

    @Test
    fun `should create a COLOC project with inputs, income and loan when no id given`() {
        /* Given */
        coEvery { projectRepository.save(any()) } returns Mono.just(
            DBProject(
                id = 1,
                userId = "abcd",
                name = "Coloc de Daniel",
                createdDate = LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
                type = ProjectType.COLOC
            )
        )

        coEvery { projectInputsService.findByProjectId(eq(1)) } returns null
        coEvery { projectInputsService.createOrUpdate(null, any()) } returns defaultInputs
        coEvery { financeService.calculateProjectOutputs(eq(defaultInputs)) } returns defaultOutputs
        coEvery { incomeService.findByProjectId(eq(1)) } returns null
        coEvery { incomeService.createOrUpdate(any()) } returns mockk()
        coEvery { loanService.findByProjectId(eq(1)) } returns null
        coEvery { loanService.createOrUpdate(null, any(), any(), any(), any(), any()) } returns mockk()

        /* When */
        val res = runBlocking {
            projectService.createOrUpdate(
                request = CreateOrUpdateProjectRequest(
                    id = null,
                    type = ProjectType.COLOC,
                    userId = "abcd",
                    name = "Coloc de Daniel",
                    inputs = defaultInputs
                )
            )
        }
        /* Then */
        assertThat(res.id).isEqualTo(1)
        assertThat(res.type).isEqualTo(ProjectType.COLOC)
        assertThat(res.userId).isEqualTo("abcd")

    }

}
