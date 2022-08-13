package com.cleverskills.domain

import com.cleverskills.data.DBIncome
import com.cleverskills.data.IncomeRepository
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class IncomeService(
    val incomeRepository: IncomeRepository,
) {
    suspend fun createOrUpdate(
        id: Long? = null, type: IncomeType, userId: String, name: String, value: Long, projectId: Long? = null
    ): Income {
        val existingIncome: DBIncome? = id?.let { incomeRepository.findById(it).awaitFirst() }

        val income: DBIncome = incomeRepository.save(
            DBIncome(
                id = id,
                userId = userId,
                name = name,
                createdDate = existingIncome?.createdDate ?: LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
                type = type,
                value = value,
                projectId = projectId,
            )
        ).awaitFirst()

        return income.toDomain()
    }

    suspend fun get(id: Long): Income {
        val income = incomeRepository.findById(id).awaitFirst()
        return income.toDomain()
    }


    suspend fun findByUserId(userId: String): List<Income> {
        return incomeRepository.findAllByUserId(userId).collectList().awaitFirst().map { it.toDomain() }
    }

    suspend fun findByProjectId(projectId: Long): Income? {
        return incomeRepository.findByProjectId(projectId).awaitFirstOrNull()?.toDomain()
    }


    suspend fun deleteById(id: Long) {
        incomeRepository.deleteById(id).awaitFirstOrNull()
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

