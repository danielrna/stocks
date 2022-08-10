package com.cleverskills.data

import data.DBProject
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectRepository : ReactiveCrudRepository<DBProject, Long> {
}
