package com.toyota.domain;

import javax.persistence.*;
import java.sql.Date;
import java.sql.Time;

@Entity
@Table(name = "saveallow")
@NamedQueries({
        @NamedQuery(name = "SaveAllow.findAll", query = "SELECT c FROM SaveAllow c")
})
public class SaveAllow {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "SAVE_ALLOW_ID")
    private Integer saveAllowId;

    @OneToOne
    @JoinColumn(name="EPERMIT_ID")
    private Epermit epermitId;

    @Column(name="SAVE_ENTRY_TIME")
    private Time saveEntryTime;

    @Column(name="SAVE_EXIT_TIME")
    private Time saveExitTime;

    @OneToOne
    @JoinColumn(name = "SAVE_COMPANY")
    private Company saveCompany;

    @Column(name="SAVE_DATE")
    private Date saveDate;

    @Column(name="SAVE_EXIT_DATE")
    private Date saveExitDate;

    public SaveAllow() {
    }

    public Date getSaveExitDate() {
        return saveExitDate;
    }

    public void setSaveExitDate(Date saveExitDate) {
        this.saveExitDate = saveExitDate;
    }

    public Date getSaveDate() {
        return saveDate;
    }

    public void setSaveDate(Date saveDate) {
        this.saveDate = saveDate;
    }

    public Time getSaveEntryTime() {
        return saveEntryTime;
    }

    public void setSaveEntryTime(Time saveEntryTime) {
        this.saveEntryTime = saveEntryTime;
    }

    public Time getSaveExitTime() {
        return saveExitTime;
    }

    public void setSaveExitTime(Time saveExitTime) {
        this.saveExitTime = saveExitTime;
    }

    public Integer getSaveAllowId() {
        return saveAllowId;
    }

    public void setSaveAllowId(Integer saveAllowId) {
        this.saveAllowId = saveAllowId;
    }

    public Epermit getEpermitId() {
        return epermitId;
    }

    public void setEpermitId(Epermit epermitId) {
        this.epermitId = epermitId;
    }

    public Company getSaveCompany() {
        return saveCompany;
    }

    public void setSaveCompany(Company saveCompany) {
        this.saveCompany = saveCompany;
    }
}

