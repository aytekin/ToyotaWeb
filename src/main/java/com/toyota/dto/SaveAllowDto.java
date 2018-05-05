package com.toyota.dto;

import com.toyota.domain.Company;
import com.toyota.domain.Epermit;
import com.toyota.domain.SaveAllow;

import java.sql.Date;
import java.sql.Time;

public class SaveAllowDto {

    private Integer saveAllowId;

    private Epermit epermitId;

    private Time saveEntryTime;

    private Time saveExitTime;

    private Company saveCompany;

    private Date saveDate;

    private Date saveExitDate;

    public SaveAllowDto() {
    }

    public SaveAllowDto(SaveAllow saveAllow)
    {
        this.saveAllowId=saveAllow.getSaveAllowId();
        this.epermitId=saveAllow.getEpermitId();
        this.saveEntryTime=saveAllow.getSaveEntryTime();
        this.saveExitTime=saveAllow.getSaveExitTime();
        this.saveDate = saveAllow.getSaveDate();
        this.saveCompany=saveAllow.getSaveCompany();
        this.saveExitDate=saveAllow.getSaveExitDate();
    }

    public Date getSaveExitDate() {
        return saveExitDate;
    }

    public void setSaveExitDate(Date saveExitDate) {
        this.saveExitDate = saveExitDate;
    }

    public Company getSaveCompany() {
        return saveCompany;
    }

    public void setSaveCompany(Company saveCompany) {
        this.saveCompany = saveCompany;
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
}
