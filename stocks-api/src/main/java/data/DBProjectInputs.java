package data;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.domain.Persistable;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("projectinputs")
public class DBProjectInputs implements Persistable<Long> {
    @Id
    @Column("id")
    private Long id;
    @Column("ownerId")
    private String ownerId;
    @Column("nbChambre")
    private Long nbChambre;
    @Column("prixChambre")
    private Long prixChambre;
    @Column("prix")
    private Long prix;
    @Column("travaux")
    private Long travaux;
    @Column("apport")
    private Long apport;
    @Column("tauxCredit")
    private Double tauxCredit;
    @Column("dureeCredit")
    private Long dureeCredit;
    @Column("meubles")
    private Long meubles;
    @Column("copro")
    private Long copro;
    @Column("impots")
    private Long impots;
    @Column("tf")
    private Long tf;
    @Column("pno")
    private Long pno;
    @Column("autre")
    private Long autre;
    @Column("cfe")
    private Long cfe;
    @Column("entretien")
    private Long entretien;
    @Column("chasse")
    private Long chasse;
    @Column("vacance")
    private Long vacance;
    @Column("updatedDate")
    private LocalDateTime updatedDate;

    @Transient
    private boolean newProjectInputs;

    public DBProjectInputs(
            Long id,
            Long nbChambre,
            Long prixChambre,
            Long prix,
            Long travaux,
            Long apport,
            Double tauxCredit,
            Long dureeCredit,
            Long meubles,
            Long copro,
            Long impots,
            Long tf,
            Long pno,
            Long autre,
            Long cfe,
            Long entretien,
            Long chasse,
            Long vacance
    ) {
        this.id = id;
        this.nbChambre = nbChambre;
        this.prixChambre = prixChambre;
        this.prix = prix;
        this.travaux = travaux;
        this.apport = apport;
        this.tauxCredit = tauxCredit;
        this.dureeCredit = dureeCredit;
        this.meubles = meubles;
        this.copro = copro;
        this.impots = impots;
        this.tf = tf;
        this.pno = pno;
        this.autre = autre;
        this.cfe = cfe;
        this.entretien = entretien;
        this.chasse = chasse;
        this.vacance = vacance;

        this.updatedDate = LocalDateTime.now();
    }

    public DBProjectInputs() {
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

    public Long getNbChambre() {
        return nbChambre;
    }

    public void setNbChambre(Long nbChambre) {
        this.nbChambre = nbChambre;
    }

    public Long getPrixChambre() {
        return prixChambre;
    }

    public void setPrixChambre(Long prixChambre) {
        this.prixChambre = prixChambre;
    }

    public Long getPrix() {
        return prix;
    }

    public void setPrix(Long prix) {
        this.prix = prix;
    }

    public Long getTravaux() {
        return travaux;
    }

    public void setTravaux(Long travaux) {
        this.travaux = travaux;
    }

    public Long getApport() {
        return apport;
    }

    public void setApport(Long apport) {
        this.apport = apport;
    }

    public Double getTauxCredit() {
        return tauxCredit;
    }

    public void setTauxCredit(Double tauxCredit) {
        this.tauxCredit = tauxCredit;
    }

    public Long getDureeCredit() {
        return dureeCredit;
    }

    public void setDureeCredit(Long dureeCredit) {
        this.dureeCredit = dureeCredit;
    }

    public Long getMeubles() {
        return meubles;
    }

    public void setMeubles(Long meubles) {
        this.meubles = meubles;
    }

    public Long getCopro() {
        return copro;
    }

    public void setCopro(Long copro) {
        this.copro = copro;
    }

    public Long getImpots() {
        return impots;
    }

    public void setImpots(Long impots) {
        this.impots = impots;
    }

    public Long getTf() {
        return tf;
    }

    public void setTf(Long tf) {
        this.tf = tf;
    }

    public Long getPno() {
        return pno;
    }

    public void setPno(Long pno) {
        this.pno = pno;
    }

    public Long getAutre() {
        return autre;
    }

    public void setAutre(Long autre) {
        this.autre = autre;
    }

    public Long getCfe() {
        return cfe;
    }

    public void setCfe(Long cfe) {
        this.cfe = cfe;
    }

    public Long getEntretien() {
        return entretien;
    }

    public void setEntretien(Long entretien) {
        this.entretien = entretien;
    }

    public Long getChasse() {
        return chasse;
    }

    public void setChasse(Long chasse) {
        this.chasse = chasse;
    }

    public Long getVacance() {
        return vacance;
    }

    public void setVacance(Long vacance) {
        this.vacance = vacance;
    }

    public LocalDateTime getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(LocalDateTime updatedDate) {
        this.updatedDate = updatedDate;
    }

    public boolean isNewProjectInputs() {
        return newProjectInputs;
    }

    public void setNewProjectInputs(boolean newProjectInputs) {
        this.newProjectInputs = newProjectInputs;
    }

    @Override
    public Long getId() {
        return this.id;
    }

    @Override
    @Transient
    public boolean isNew() {
        return this.newProjectInputs || id == null;
    }

    public DBProjectInputs setAsNew() {
        this.newProjectInputs = true;
        return this;
    }


}
