package com.cleverskills.data.house

import com.cleverskills.domain.house.HouseType
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDate
import java.time.LocalDateTime

@Table("houses")
data class DBHouse(
    @Id @Column("id") private var id: Long? = null,

    @Column("userId") var userId: String,

    @Column("name") var name: String,

    @Column("type") var type: HouseType,

    @Column("acquisitionPrice") var acquisitionPrice: Long,

    @Column("acquisitionDate") var acquisitionDate: LocalDate,

    @Column("city") var city: String,

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


