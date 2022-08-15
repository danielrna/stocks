package com.cleverskills.domain.house

import com.cleverskills.data.house.DBHouse
import com.cleverskills.data.house.HouseRepository
import kotlinx.coroutines.reactive.awaitFirst
import kotlinx.coroutines.reactive.awaitFirstOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class HouseService(
    val houseRepository: HouseRepository,
) {
    suspend fun createOrUpdate(request: CreateOrUpdateHouseRequest): House {
        val existingHouse: DBHouse? = request.id?.let { houseRepository.findById(it).awaitFirst() }

        val house: DBHouse = houseRepository.save(
            request.toDB(existingHouse)
        ).awaitFirst()

        return house.toDomain()
    }

    private fun CreateOrUpdateHouseRequest.toDB(
        existingHouse: DBHouse?
    ) = DBHouse(
        id = id,
        userId = userId,
        name = name,
        createdDate = existingHouse?.createdDate ?: LocalDateTime.now(),
        updatedDate = LocalDateTime.now(),
        type = type,
        acquisitionPrice = acquisitionPrice,
        projectId = projectId,
        city = city,
        acquisitionDate = acquisitionDate,
    )

    suspend fun get(id: Long): House? {
        val house = houseRepository.findById(id).awaitFirstOrNull()
        return house?.toDomain()
    }


    suspend fun findUserHouses(userId: String): List<House> {
        return houseRepository.findAllByUserId(userId).collectList().awaitFirst().map { it.toDomain() }
    }

    suspend fun findByProjectId(projectId: Long): House? {
        return houseRepository.findByProjectId(projectId).awaitFirstOrNull()?.toDomain()
    }


    suspend fun deleteById(id: Long) {
        houseRepository.deleteById(id).awaitFirstOrNull()
    }

    suspend fun deleteByProjectId(id: Long) {
        houseRepository.deleteByProjectId(id).awaitFirstOrNull()
    }


    private fun DBHouse.toDomain(): House {
        return House(
            id = checkNotNull(id),
            type = type,
            name = name,
            acquisitionPrice = acquisitionPrice,
            city = city,
            userId = userId,
            projectId = projectId,
            acquisitionDate = acquisitionDate,

            )
    }
}

