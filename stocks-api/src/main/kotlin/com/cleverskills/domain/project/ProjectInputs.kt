package com.cleverskills.domain.project


sealed class ProjectInputs {
    abstract var prix: Long
    abstract var travaux: Long
    abstract var apport: Long
    abstract var loanRate: Double
    abstract var dureeCredit: Long
    abstract var meubles: Long
    abstract var copro: Long
    abstract var impots: Long
    abstract var tf: Long
    abstract var pno: Long
    abstract var autre: Long
    abstract var cfe: Long
    abstract var entretien: Long
    abstract var chasse: Long
    abstract var projectId: Long?
    abstract var id: Long?
}

data class LcdProjectInputs(
    val prixNuit: Long,
    val occupation: Long,

    override var prix: Long,
    override var travaux: Long,
    override var apport: Long,
    override var loanRate: Double,
    override var dureeCredit: Long,
    override var meubles: Long,
    override var copro: Long,
    override var impots: Long,
    override var tf: Long,
    override var pno: Long,
    override var autre: Long,
    override var cfe: Long,
    override var entretien: Long,
    override var chasse: Long,
    override var projectId: Long?,
    override var id: Long?

) : ProjectInputs()


data class ColocProjectInputs(
    val nbChambre: Long,
    val prixChambre: Long,
    val vacance: Long,

    override var prix: Long,
    override var travaux: Long,
    override var apport: Long,
    override var loanRate: Double,
    override var dureeCredit: Long,
    override var meubles: Long,
    override var copro: Long,
    override var impots: Long,
    override var tf: Long,
    override var pno: Long,
    override var autre: Long,
    override var cfe: Long,
    override var entretien: Long,
    override var chasse: Long,
    override var projectId: Long?,
    override var id: Long?

) : ProjectInputs()
