package com.toyota.dto;

import com.toyota.domain.Epermit;
import com.toyota.domain.SaveAllow;

import java.sql.Date;
import java.sql.Time;

public class SaveAllowDto {

    private Integer saveAllowId;

    private Epermit epermitId;

    private Time saveEntryTime;

    private Time saveExitTime;

    private Date saveDate;

    public SaveAllowDto() {
    }

    public SaveAllowDto(SaveAllow saveAllow)
    {

        this.epermitId=saveAllow.getEpermitId();
        this.saveEntryTime=saveAllow.getSaveEntryTime();
        this.saveExitTime=saveAllow.getSaveExitTime();
        this.saveDate = saveAllow.getSaveDate();
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
