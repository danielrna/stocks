package com.cleverskills.domain.income

import com.cleverskills.data.income.DBIncome
import com.cleverskills.data.income.IncomeRepository
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class IncomeService(
    val incomeRepository: IncomeRepository,
) {
    suspend fun createOrUpdate(request: CreateOrUpdateIncomeRequest): Income {
        val existingIncome: DBIncome? = request.id?.let { incomeRepository.findById(it).awaitFirst() }

        val income: DBIncome = incomeRepository.save(
            request.toDB(existingIncome)
        ).awaitFirst()

        return income.toDomain()
    }

    private fun CreateOrUpdateIncomeRequest.toDB(
        existingIncome: DBIncome?
    ): DBIncome = DBIncome(
        id = id,
        userId = userId,
        name = name,
        createdDate = existingIncome?.createdDate ?: LocalDateTime.now(),
        updatedDate = LocalDateTime.now(),
        type = type,
        value = value,
        projectId = projectId,
    )

    suspend fun get(id: Long): Income? {
        val income = incomeRepository.findById(id).awaitFirstOrNull()
        return income?.toDomain()
    }


    suspend fun findUserIncomes(userId: String): List<Income> {
        return incomeRepository.findAllByUserId(userId).collectList().awaitFirst().map { it.toDomain() }
    }

    suspend fun findByProjectId(projectId: Long): Income? {
        return incomeRepository.findByProjectId(projectId).awaitFirstOrNull()?.toDomain()
    }


    suspend fun deleteById(id: Long) {
        incomeRepository.deleteById(id).awaitFirstOrNull()
    }

    suspend fun deleteByProjectId(id: Long) {
        incomeRepository.deleteByProjectId(id).awaitFirstOrNull()
    }


    private fun DBIncome.toDomain(): Income {
        return Income(
            id = checkNotNull(id),
            type = type,
            name = name,
            value = value,
            userId = userId,
            projectId = projectId
        )
    }
}

