package com.cleverskills.data.house

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono

@Repository
interface HouseRepository : ReactiveCrudRepository<DBHouse, Long> {
    suspend fun findAllByUserId(userId: String): Flux<DBHouse>
    suspend fun findByProjectId(projectId: Long): Mono<DBHouse>
    suspend fun deleteByProjectId(projectId: Long): Mono<Void>

}
