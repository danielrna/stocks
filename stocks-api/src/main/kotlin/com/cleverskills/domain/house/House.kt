package com.cleverskills.domain.house

import java.time.LocalDate

data class House(
    val id: Long,
    val type: HouseType,
    val name: String,
    val acquisitionPrice: Long,
    val acquisitionDate: LocalDate,
    val city: String,
    val userId: String,
    val projectId: Long?,
)

