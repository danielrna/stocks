package com.cleverskills.domain.finance

import com.cleverskills.domain.income.IncomeService
import com.cleverskills.domain.income.IncomeType
import com.cleverskills.domain.project.ProjectInputs
import com.cleverskills.domain.project.ProjectOutputs
import org.springframework.stereotype.Service
import kotlin.math.pow
import kotlin.math.roundToLong

@Service
class FinanceService(val incomeService: IncomeService) {


    fun calculateProjectOutputs(inputs: ProjectInputs): ProjectOutputs {
        val tfMensuelle = inputs.tf / 12
        val notaire = (0.08 * inputs.prix).toLong()
        val totalEmprunte = (inputs.travaux
                + notaire
                + inputs.meubles
                + inputs.prix
                + inputs.chasse
                - inputs.apport)
        val creditMensuel = this.PMT(inputs.tauxCredit, inputs.dureeCredit, totalEmprunte)
        val monthlyRent = (inputs.nbChambre * inputs.prixChambre) * (12 - inputs.vacance) / 12
        val gestion = (0.08 * monthlyRent).roundToLong()
        val monthlyExpenses = (inputs.copro
                + inputs.impots
                + inputs.pno
                + inputs.autre
                + tfMensuelle
                + inputs.cfe
                + inputs.entretien
                + creditMensuel
                + gestion)
        val cashflow = monthlyRent - monthlyExpenses
        return ProjectOutputs(
            notaire = notaire,
            totalEmprunte = totalEmprunte,
            creditMensuel = creditMensuel,
            tfMensuelle = tfMensuelle,
            monthlyRent = monthlyRent,
            gestion = gestion,
            monthlyExpenses = monthlyExpenses,
            cashflow = cashflow,
            cashflowAfterCredit = cashflow - creditMensuel,
            rendementBrut = (monthlyRent * 12 / inputs.prix * 100).toDouble().roundToLong(),
            rendementNet = ((cashflow + creditMensuel) * 12 / totalEmprunte * 100).toDouble().roundToLong()
        )
    }


    private fun PMT(taux: Double, dureeAnnees: Long, totalEmprunte: Long): Long {
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
        val immoIncome = incomeService.findUserIncomes(userId).filter { it.type == IncomeType.IMMO }.sumOf { it.value }
        val otherIncome = incomeService.findUserIncomes(userId).filter { it.type != IncomeType.IMMO }.sumOf { it.value }
        val consideredIncomeForMortgage = 0.7*immoIncome + otherIncome

        val salaryIncome = incomeService.findUserIncomes(userId).filter { it.type == IncomeType.SALAIRE }.sumOf { it.value }

       return FinancialSummary(passiveTotalIncome = immoIncome, activeTotalIncome = salaryIncome, debtRate = 13.0)
    }
}
