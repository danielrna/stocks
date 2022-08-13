package com.cleverskills.data

import org.springframework.data.repository.reactive.ReactiveCrudRepository
import org.springframework.stereotype.Repository

@Repository
interface ProjectInputsRepository : ReactiveCrudRepository<DBProjectInputs, Long> {
}
