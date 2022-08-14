package com.cleverskills.api.loan

import com.cleverskills.api.loan.ApiUpdateLoanRequest
import com.cleverskills.domain.loan.Loan
import com.cleverskills.domain.loan.LoanService
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*


@Api("Loan")
@RestController
@RequestMapping("loan")
class LoanController(val loanService: LoanService) {

    @ApiOperation(value = "Create loan")
    @PostMapping("")
    suspend fun create(
        @RequestBody request: ApiCreateLoanRequest
    ): ApiLoan {
        return loanService.createOrUpdate(
            null,
            request.type,
            request.userId,
            request.name,
            request.value,
        ).toApi()
    }

    @ApiOperation(value = "Update loan")
    @PutMapping("")
    suspend fun update(
        @RequestBody request: ApiUpdateLoanRequest
    ): ApiLoan {
        return loanService.createOrUpdate(
            request.id,
            request.type,
            request.userId,
            request.name,
            request.value,
            request.projectId
        ).toApi()
    }

    @ApiOperation(value = "Get loan")
    @GetMapping("{id}")
    suspend fun get(
        @PathVariable(name = "id", required = true) id: Long,
    ): ApiLoan? {
        return loanService.get(id)?.toApi()
    }

    @ApiOperation(value = "Get loans by user id")
    @GetMapping("")
    suspend fun findByUserId(
        @RequestParam(name = "userId", required = true) userId: String,
    ): List<ApiLoan> {
        return loanService.findUserLoans(userId).map { it.toApi() }
    }

    @ApiOperation(value = "Delete loan by id")
    @DeleteMapping("{id}")
    suspend fun delete(
        @PathVariable(name = "id", required = true) id: Long,
    ): ResponseEntity<Unit> {
        loanService.deleteById(id)
        return ResponseEntity<Unit>(HttpStatus.NO_CONTENT)
    }


    private fun Loan.toApi(): ApiLoan {
        return ApiLoan(
            id = id,
            type = type,
            userId = userId,
            name = name,
            value = value,
            projectId = projectId,
        )
    }

}
