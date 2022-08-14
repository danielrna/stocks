package com.cleverskills.domain.loan

import com.cleverskills.data.DBLoan
import com.cleverskills.data.LoanRepository
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class LoanService(
    val loanRepository: LoanRepository,
) {
    suspend fun createOrUpdate(
        id: Long? = null, type: LoanType, userId: String, name: String, value: Long, projectId: Long? = null
    ): Loan {
        val existingLoan: DBLoan? = id?.let { loanRepository.findById(it).awaitFirst() }

        val loan: DBLoan = loanRepository.save(
            DBLoan(
                id = id,
                userId = userId,
                name = name,
                createdDate = existingLoan?.createdDate ?: LocalDateTime.now(),
                updatedDate = LocalDateTime.now(),
                type = type,
                value = value,
                projectId = projectId,
            )
        ).awaitFirst()

        return loan.toDomain()
    }

    suspend fun get(id: Long): Loan {
        val loan = loanRepository.findById(id).awaitFirst()
        return loan.toDomain()
    }


    suspend fun findUserLoans(userId: String): List<Loan> {
        return loanRepository.findAllByUserId(userId).collectList().awaitFirst().map { it.toDomain() }
    }

    suspend fun findByProjectId(projectId: Long): Loan? {
        return loanRepository.findByProjectId(projectId).awaitFirstOrNull()?.toDomain()
    }


    suspend fun deleteById(id: Long) {
        loanRepository.deleteById(id).awaitFirstOrNull()
    }
    suspend fun deleteByProjectId(id: Long) {
        loanRepository.deleteByProjectId(id).awaitFirstOrNull()
    }


    private fun DBLoan.toDomain(): Loan {
        return Loan(
            id = checkNotNull(id),
            type = type,
            name = name,
            value = value,
            userId = userId,
            projectId = projectId
        )
    }
}

