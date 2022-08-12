package data;

import com.cleverskills.api.ProjectType;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

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
    private LocalDateTime createdDate;

    @Column("updatedDate")
    @LastModifiedDate
    private LocalDateTime updatedDate;

    @Column("type")
    private ProjectType type;

    @Column("inputsId")
    private Long inputsId;

    @Transient
    private boolean newProject;

    public DBProject(Long id,
                     String ownerId,
                     String name,
                     ProjectType type,
                     Long inputsId
    ) {
        this.id = id;
        this.ownerId = ownerId;
        this.name = name;
        this.type = type;
        this.inputsId = inputsId;
        this.updatedDate = LocalDateTime.now();
        if (id == null) this.createdDate = LocalDateTime.now();
    }

    public DBProject() {
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(String ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public ProjectType getType() {
        return type;
    }

    public void setType(ProjectType type) {
        this.type = type;
    }

    public Long getInputsId() {
        return inputsId;
    }

    public void setInputsId(Long inputsId) {
        this.inputsId = inputsId;
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

    public DBProject setAsNew() {
        this.newProject = true;
        return this;
    }


}
