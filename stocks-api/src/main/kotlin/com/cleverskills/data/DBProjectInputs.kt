package com.cleverskills.data

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.Transient
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table("projectinputs")
data class DBProjectInputs(
    @Id
    @Column("id")
    private var id: Long? = null,

    @Column("nbChambre")
    var nbChambre: Long,

    @Column("prixChambre")
    var prixChambre: Long,

    @Column("prix")
    var prix: Long,

    @Column("travaux")
    var travaux: Long,

    @Column("apport")
    var apport: Long,

    @Column("tauxCredit")
    var tauxCredit: Double,

    @Column("dureeCredit")
    var dureeCredit: Long,

    @Column("meubles")
    var meubles: Long,

    @Column("copro")
    var copro: Long,

    @Column("impots")
    var impots: Long,

    @Column("tf")
    var tf: Long,

    @Column("pno")
    var pno: Long,

    @Column("autre")
    var autre: Long,

    @Column("cfe")
    var cfe: Long,

    @Column("entretien")
    var entretien: Long,

    @Column("chasse")
    var chasse: Long,

    @Column("vacance")
    var vacance: Long,

    @Column("updatedDate")
    var updatedDate: LocalDateTime = LocalDateTime.now()
) : Persistable<Long?> {

    override fun getId(): Long? {
        return id
    }

    @Transient
    override fun isNew(): Boolean {
        return id == null
    }


}
