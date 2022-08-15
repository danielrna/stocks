package com.cleverskills.data.project

import com.cleverskills.data.project.DBProject
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux

@Repository
interface ProjectRepository : ReactiveCrudRepository<DBProject, Long> {
suspend fun findAllByUserId(userId:String) : Flux<DBProject>

}

