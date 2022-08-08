package data;

import com.cleverskills.api.ProjectType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Date;

@Table("projects")
public class DBProject implements Persistable<Long> {
    @Id
    @Column("id")
    private Long id;

    @Column("ownerId")
    private String ownerId;

    @Column("name")
    private String name;

    @Column("createdDate")
    @CreatedDate
    private Date createdDate;

    @Column("updatedDate")
    @LastModifiedDate
    private Date updatedDate;

    @Column("type")
    private ProjectType type;

    @Column("inputsId")
    private String inputsId;

    @Transient
    private boolean newProject;

    public DBProject(Long id,
                     String ownerId,
                     String name,
                     ProjectType type,
                     String inputsId
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.type = type;
        this.inputsId = inputsId;
        this.updatedDate = new Date();
    }

    public DBProject() {
    }

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    @Transient
    public boolean isNew() {
        return this.newProject || id == null;
    }

    public DBProject setAsNew(){
        this.newProject = true;
        return this;
    }


}
