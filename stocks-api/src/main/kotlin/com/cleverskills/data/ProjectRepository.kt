package com.cleverskills.data

import data.DBProject
import data.DBProjectInputs
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository
import reactor.core.publisher.Flux

@Repository
interface ProjectRepository : ReactiveCrudRepository<DBProject, Long> {
suspend fun findAllByUserId(userId:String) : Flux<DBProject>

}

@Repository
interface ProjectInputsRepository : ReactiveCrudRepository<DBProjectInputs, Long> {
}
