package com.cleverskills.data.income

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface IncomeRepository : ReactiveCrudRepository<DBIncome, Long> {
    suspend fun findAllByUserId(userId: String): Flux<DBIncome>
    suspend fun findByProjectId(projectId: Long): Mono<DBIncome>
    suspend fun deleteByProjectId(projectId: Long): Mono<Void>

}
