package com.cleverskills.domain

import org.springframework.stereotype.Service
import kotlin.math.pow
import kotlin.math.roundToLong

@Service
class RentaService {
    fun calculateOutputs(inputs: ProjectInputs): ProjectOutputs {
        val tfMensuelle = inputs.tf / 12
        val notaire = (0.08 * inputs.prix).toLong()
        val totalEmprunte = (inputs.travaux
                + notaire
                + inputs.meubles
                + inputs.prix
                + inputs.chasse
                - inputs.apport)
        val mensualiteCredit = this.PMT(inputs.tauxCredit, inputs.dureeCredit, totalEmprunte)
        val monthlyRent = (inputs.nbChambre * inputs.prixChambre) * (12 - inputs.vacance) / 12
        val gestion = (0.08 * monthlyRent).roundToLong()
        val monthlyExpenses = (inputs.copro
                + inputs.impots
                + inputs.pno
                + inputs.autre
                + tfMensuelle
                + inputs.cfe
                + inputs.entretien
                + mensualiteCredit
                + gestion)
        val cashflow = monthlyRent - monthlyExpenses
        return ProjectOutputs(
            notaire = notaire,
            totalEmprunte = totalEmprunte,
            mensualiteCredit = mensualiteCredit,
            tfMensuelle = tfMensuelle,
            monthlyRent = monthlyRent,
            gestion = gestion,
            monthlyExpenses = monthlyExpenses,
            cashflow = cashflow,
            cashflowNoCredit = cashflow - mensualiteCredit,
            rendementBrut = (monthlyRent * 12 / inputs.prix * 100).toDouble().roundToLong(),
            rendementNet = ((cashflow + mensualiteCredit) * 12 / totalEmprunte * 100).toDouble().roundToLong()
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
}
