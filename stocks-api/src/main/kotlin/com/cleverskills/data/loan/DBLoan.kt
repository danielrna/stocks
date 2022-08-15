package com.cleverskills.data.loan

import com.cleverskills.domain.loan.LoanType
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table("loans")
data class DBLoan(
    @Id @Column("id") private var id: Long? = null,

    @Column("userId") var userId: String,

    @Column("name") var name: String,

    @Column("type") var type: LoanType,

    @Column("value") var value: Long,

    @Column("projectId") var projectId: Long?,


    @Column("createdDate") @CreatedDate var createdDate: LocalDateTime,

    @Column("updatedDate") @LastModifiedDate var updatedDate: LocalDateTime,

    ) : Persistable<Long?> {
    override fun getId(): Long? {
        return id
    }

    override fun isNew(): Boolean {
        return id == null
    }
}


