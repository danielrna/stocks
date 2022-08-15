package com.cleverskills.api.house

import com.cleverskills.domain.house.CreateOrUpdateHouseRequest
import com.cleverskills.domain.house.House
import com.cleverskills.domain.house.HouseService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Api("House")
@RestController
@RequestMapping("house")
class HouseController(val houseService: HouseService) {

    @ApiOperation(value = "Create house")
    @PostMapping("")
    suspend fun create(
        @RequestBody request: ApiCreateOrUpdateHouseRequest
    ): ApiHouse {
        return houseService.createOrUpdate(request.toDomain()).toApi()
    }

    @ApiOperation(value = "Update house")
    @PutMapping("")
    suspend fun update(
        @RequestBody request: ApiCreateOrUpdateHouseRequest
    ): ApiHouse {
        return create(request)

    }

    private fun ApiCreateOrUpdateHouseRequest.toDomain(): CreateOrUpdateHouseRequest {
        return CreateOrUpdateHouseRequest(
            id = id,
            type = type,
            userId = userId,
            name = name,
            acquisitionPrice = acquisitionPrice,
            projectId = projectId,
            acquisitionDate = acquisitionDate,
            city = city
        )
    }

    @ApiOperation(value = "Get house")
    @GetMapping("{id}")
    suspend fun get(
        @PathVariable(name = "id", required = true) id: Long,
    ): ApiHouse? {
        return houseService.get(id)?.toApi()
    }

    @ApiOperation(value = "Get houses by user id")
    @GetMapping("")
    suspend fun findByUserId(
        @RequestParam(name = "userId", required = true) userId: String,
    ): List<ApiHouse> {
        return houseService.findUserHouses(userId).map { it.toApi() }
    }

    @ApiOperation(value = "Delete house by id")
    @DeleteMapping("{id}")
    suspend fun delete(
        @PathVariable(name = "id", required = true) id: Long,
    ): ResponseEntity<Unit> {
        houseService.deleteById(id)
        return ResponseEntity<Unit>(HttpStatus.NO_CONTENT)
    }


    private fun House.toApi(): ApiHouse {
        return ApiHouse(
            id = id,
            type = type,
            userId = userId,
            name = name,
            acquisitionPrice = acquisitionPrice,
            projectId = projectId,
            acquisitionDate = acquisitionDate
        )
    }


}
