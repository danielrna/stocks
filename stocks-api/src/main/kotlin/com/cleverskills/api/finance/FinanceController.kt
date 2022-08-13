package com.cleverskills.api.finance

import com.cleverskills.domain.finance.FinanceService
import com.cleverskills.domain.finance.FinancialSummary
import io.swagger.annotations.Api
import io.swagger.annotations.ApiOperation
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController


@Api("Finance")
@RestController
@RequestMapping("finance")
class FinanceController(val financeService: FinanceService) {

    @ApiOperation(value = "Calculate project financial outputs")
    @GetMapping("summary")
    suspend fun getUserSummary(
        @RequestParam(required = true) userId: String,
    ): ApiFinancialSummary {
        return financeService.getUserSummary(userId).toApi()
    }


    private fun FinancialSummary.toApi(): ApiFinancialSummary {

        return ApiFinancialSummary(
            passiveTotalIncome = passiveTotalIncome, activeTotalIncome = activeTotalIncome, debtRatio = debtRatio
        )
    }
}
