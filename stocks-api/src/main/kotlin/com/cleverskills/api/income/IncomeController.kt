package com.cleverskills.api.income

import com.cleverskills.domain.income.CreateOrUpdateIncomeRequest
import com.cleverskills.domain.income.Income
import com.cleverskills.domain.income.IncomeService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Api("Income")
@RestController
@RequestMapping("income")
class IncomeController(val incomeService: IncomeService) {

    @ApiOperation(value = "Create income")
    @PostMapping("")
    suspend fun create(
        @RequestBody request: ApiCreateOrUpdateIncomeRequest
    ): ApiIncome {
        return incomeService.createOrUpdate(
            request.toDomain(),
        ).toApi()
    }

    @ApiOperation(value = "Update income")
    @PutMapping("")
    suspend fun update(
        @RequestBody request: ApiCreateOrUpdateIncomeRequest
    ): ApiIncome {
        return create(request)
    }

    @ApiOperation(value = "Get income")
    @GetMapping("{id}")
    suspend fun get(
        @PathVariable(name = "id", required = true) id: Long,
    ): ApiIncome? {
        return incomeService.get(id)?.toApi()
    }

    @ApiOperation(value = "Get incomes by user id")
    @GetMapping("")
    suspend fun findByUserId(
        @RequestParam(name = "userId", required = true) userId: String,
    ): List<ApiIncome> {
        return incomeService.findUserIncomes(userId).map { it.toApi() }
    }

    @ApiOperation(value = "Delete income by id")
    @DeleteMapping("{id}")
    suspend fun delete(
        @PathVariable(name = "id", required = true) id: Long,
    ): ResponseEntity<Unit> {
        incomeService.deleteById(id)
        return ResponseEntity<Unit>(HttpStatus.NO_CONTENT)
    }


    private fun Income.toApi(): ApiIncome {
        return ApiIncome(
            id = id,
            type = type,
            userId = userId,
            name = name,
            value = value,
            projectId = projectId,
        )
    }

    fun ApiCreateOrUpdateIncomeRequest.toDomain(): CreateOrUpdateIncomeRequest {
        return CreateOrUpdateIncomeRequest(
            id = id,
            type = type,
            userId = userId,
            name = name,
            value = value,
            projectId = projectId
        )
    }
}
