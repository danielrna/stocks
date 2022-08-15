package com.cleverskills.domain.house

import java.time.LocalDate

data class CreateOrUpdateHouseRequest(
    val id: Long? = null,
    val type: HouseType,
    val userId: String,
    val name: String,
    val acquisitionPrice: Long,
    val acquisitionDate: LocalDate,
    val city: String,
    val projectId: Long? = null
)
