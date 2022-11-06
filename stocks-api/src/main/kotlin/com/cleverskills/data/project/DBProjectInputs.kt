package com.cleverskills.data.project

import com.cleverskills.domain.project.ProjectType
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.Transient
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table("projectinputs")
data class DBProjectInputs(
    @Id @Column("id") private var id: Long? = null,

    @Column("type") val type: ProjectType,

    //for coloc
    @Column("nbChambre") val nbChambre: Long?,

    @Column("prixChambre") val prixChambre: Long?,

    @Column("vacance") val vacance: Long?,

    //for lcd
    @Column("prixNuit") val prixNuit: Long?,

    @Column("occupation") val occupation: Long?,

    /**
     * Common fields
     */
    @Column("prix") val prix: Long,

    @Column("travaux") val travaux: Long,

    @Column("apport") val apport: Long,

    @Column("loanRate") val loanRate: Double,

    @Column("dureeCredit") val dureeCredit: Long,

    @Column("meubles") val meubles: Long,

    @Column("copro") val copro: Long,

    @Column("impots") val impots: Long,

    @Column("tf") val tf: Long,

    @Column("pno") val pno: Long,

    @Column("autre") val autre: Long,

    @Column("cfe") val cfe: Long,

    @Column("entretien") val entretien: Long,

    @Column("chasse") val chasse: Long,


    @Column("projectId") val projectId: Long?,

    @Column("updatedDate") var updatedDate: LocalDateTime = LocalDateTime.now()
) : Persistable<Long?> {

    override fun getId(): Long? {
        return id
    }

    @Transient
    override fun isNew(): Boolean {
        return id == null
    }


}
