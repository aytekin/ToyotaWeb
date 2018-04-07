package com.toyota.dto;

import com.toyota.domain.*;

import java.sql.Time;
import java.util.Date;

public class EpermitDto {

    private Integer epermitId;

    private String epermit_names;

    private Date entryDate;

    private Date exitDate;

    private Time enterTime;

    private Time exitTime;

    private Company entryCompany;

    private Rfentry reasonfentry;

    private Place entryPlaceId;

    private User accompanyPersonal;

    private int wsEducation;


    public EpermitDto()
    {

    }
    public EpermitDto(Epermit epermit) {
        this.epermitId = epermit.getEpermitId();
        this.epermit_names = epermit.getEpermit_names();
        this.entryDate = epermit.getEntryDate();
        this.exitDate = epermit.getExitDate();
        this.enterTime = epermit.getEnterTime();
        this.exitTime = epermit.getExitTime();
        this.entryPlaceId= epermit.getEntryPlaceId();
        this.entryCompany = epermit.getEntryCompany();
        this.reasonfentry = epermit.getReasonfentry();
        this.accompanyPersonal = epermit.getAccompanyPersonal();
        this.wsEducation = epermit.getWsEducation();
    }

    public Integer getEpermitId() {
        return epermitId;
    }

    public void setEpermitId(Integer epermitId) {
        this.epermitId = epermitId;
    }

    public String getEpermit_names() {
        return epermit_names;
    }

    public void setEpermit_names(String epermit_names) {
        this.epermit_names = epermit_names;
    }

    public Date getEntryDate() {
        return entryDate;
    }

    public void setEntryDate(Date entryDate) {
        this.entryDate = entryDate;
    }

    public Date getExitDate() {
        return exitDate;
    }

    public void setExitDate(Date exitDate) {
        this.exitDate = exitDate;
    }

    public Time getEnterTime() {
        return enterTime;
    }

    public void setEnterTime(Time enterTime) {
        this.enterTime = enterTime;
    }

    public Time getExitTime() {
        return exitTime;
    }

    public void setExitTime(Time exitTime) {
        this.exitTime = exitTime;
    }

    public Company getEntryCompany() {
        return entryCompany;
    }

    public void setEntryCompany(Company entryCompany) {
        this.entryCompany = entryCompany;
    }

    public Rfentry getReasonfentry() {
        return reasonfentry;
    }

    public void setReasonfentry(Rfentry reasonfentry) {
        this.reasonfentry = reasonfentry;
    }

    public User getAccompanyPersonal() {
        return accompanyPersonal;
    }

    public void setAccompanyPersonal(User acompanyPersonal) {
        this.accompanyPersonal = acompanyPersonal;
    }

    public int getWsEducation() {
        return wsEducation;
    }

    public void setWsEducation(int wsEducation) {
        this.wsEducation = wsEducation;
    }

    public Place getEntryPlaceId() {
        return entryPlaceId;
    }

    public void setEntryPlaceId(Place entryPlaceId) {
        this.entryPlaceId = entryPlaceId;
    }

}
