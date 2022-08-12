package com.cleverskills.data

import data.DBProject
import data.DBProjectInputs
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : ReactiveCrudRepository<DBProject, Long> {


}

@Repository
interface ProjectInputsRepository : ReactiveCrudRepository<DBProjectInputs, Long> {
}
