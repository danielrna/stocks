package com.cleverskills.domain.finance

import com.cleverskills.domain.income.IncomeService
import com.cleverskills.domain.income.IncomeType
import com.cleverskills.domain.loan.LoanService
import com.cleverskills.domain.project.ProjectInputs
import com.cleverskills.domain.project.ProjectOutputs
import org.springframework.stereotype.Service
import kotlin.math.pow
import kotlin.math.roundToLong

@Service
class FinanceService(val incomeService: IncomeService, val loanService: LoanService) {


    fun calculateProjectOutputs(inputs: ProjectInputs): ProjectOutputs {
        val tfMensuelle = inputs.tf / 12
        val notaire = (0.08 * inputs.prix).toLong()
        val totalEmprunte = (inputs.travaux
                + notaire
                + inputs.meubles
                + inputs.prix
                + inputs.chasse
                - inputs.apport)
        val monthlyLoan = this.pmt(inputs.loanRate, inputs.dureeCredit, totalEmprunte)
        val monthlyRent = (inputs.nbChambre * inputs.prixChambre) * (12 - inputs.vacance) / 12
        val gestion = (0.08 * monthlyRent).roundToLong()
        val monthlyExpenses = (inputs.copro
                + inputs.impots
                + inputs.pno
                + inputs.autre
                + tfMensuelle
                + inputs.cfe
                + inputs.entretien
                + gestion)
        val cashflow = monthlyRent - monthlyExpenses - monthlyLoan
        return ProjectOutputs(
            notaire = notaire,
            totalEmprunte = totalEmprunte,
            monthlyLoan = monthlyLoan,
            tfMensuelle = tfMensuelle,
            monthlyRent = monthlyRent,
            gestion = gestion,
            monthlyExpenses = monthlyExpenses,
            cashflow = cashflow,
            cashflowWithoutLoan = cashflow + monthlyLoan,
            rendementBrut = (monthlyRent * 12.0 / inputs.prix * 100.0).twoDecimals(),
            rendementNet = ((cashflow + monthlyLoan) * 12.0 / totalEmprunte * 100.0).twoDecimals()
        )
    }


    private fun pmt(taux: Double, dureeAnnees: Long, totalEmprunte: Long): Long {
        val rate = taux / 100 / 12
        val nperiod = dureeAnnees * 12
        val fv = 0;
        if (rate == 0.0) return -(totalEmprunte + fv) / nperiod;
        val pvif = (1 + rate).pow(nperiod.toDouble());
        var pmt = rate / (pvif - 1) * -(totalEmprunte * pvif + fv);
        pmt /= (1 + rate);

        return (-pmt).roundToLong();
    }

    suspend fun getUserSummary(userId: String): FinancialSummary {
        val incomes = incomeService.findUserIncomes(userId)
        val immoIncome = incomes.filter { it.type == IncomeType.IMMO }.sumOf { it.value }
        val salaryIncome = incomes.filter { it.type == IncomeType.SALAIRE }.sumOf { it.value }
        val otherIncome = incomes.filter { it.type != IncomeType.IMMO }.sumOf { it.value }

        val totalLoans = loanService.findUserLoans(userId).sumOf { it.value }
        val consideredIncomeForLoan = 0.7 * immoIncome + otherIncome
        val debtRatio = totalLoans / consideredIncomeForLoan * 100

        return FinancialSummary(
            passiveTotalIncome = immoIncome,
            activeTotalIncome = salaryIncome,
            debtRatio = debtRatio
        )
    }
}
