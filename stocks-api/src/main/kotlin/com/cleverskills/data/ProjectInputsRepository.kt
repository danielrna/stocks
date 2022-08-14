package com.cleverskills.data

import com.cleverskills.domain.project.ProjectInputs
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Mono

@Repository
interface ProjectInputsRepository : ReactiveCrudRepository<DBProjectInputs, Long> {
    suspend fun deleteByProjectId(projectId: Long): Mono<Void>
    suspend fun findByProjectId(projectId: Long): Mono<DBProjectInputs>

}
