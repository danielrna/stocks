package com.cleverskills.data

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface LoanRepository : ReactiveCrudRepository<DBLoan, Long> {
    suspend fun findAllByUserId(userId: String): Flux<DBLoan>
    suspend fun findByProjectId(projectId: Long): Mono<DBLoan>

}
