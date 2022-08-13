package data

import com.cleverskills.api.ProjectType
import org.springframework.data.annotation.CreatedDate
import org.springframework.data.annotation.Id
import org.springframework.data.annotation.LastModifiedDate
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime

@Table("projects")
data class DBProject(
    @Id
    @Column("id")
    private var id: Long? = null,

    @Column("userId")
    var userId: String,

    @Column("name")
    var name: String,

    @Column("createdDate")
    @CreatedDate
    var createdDate: LocalDateTime,

    @Column("updatedDate")
    @LastModifiedDate
    var updatedDate: LocalDateTime ,

    @Column("type")
    var type: ProjectType,

    @Column("inputsId")
    var inputsId: Long,

    ) : Persistable<Long?> {
    //        if (id == null) this.createdDate = LocalDateTime.now()
//        if (createdDate != null) this.createdDate = createdDate
    override fun getId(): Long? {
        return id
    }

    override fun isNew(): Boolean {
        return id == null
    }
}


