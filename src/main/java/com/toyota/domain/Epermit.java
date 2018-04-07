package com.toyota.domain;


import javax.persistence.*;
import java.sql.Time;
import java.util.Date;

@Entity
@Table(name = "epermit")
@NamedQueries({
        @NamedQuery(name = "Epermit.findAll", query = "SELECT c FROM Epermit c")
})
public class Epermit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "EPERMIT_ID")
    private Integer epermitId;

    @Column(name = "EPERMIT_NAMES")
    private String epermit_names;

    @Column(name = "ENTRY_DATE")
    private Date entryDate;

    @Column(name = "EXIT_DATE")
    private Date exitDate;

    @Column(name = "ENTRY_TIME")
    private Time enterTime;

    @Column(name = "EXIT_TIME")
    private Time exitTime;

    @OneToOne
    @JoinColumn(name = "ENTRY_COMPANY_ID")
    private Company entryCompany;

    @ManyToOne
    @JoinColumn(name = "REASON_FOR_ENTRY_ID")
    private Rfentry reasonfentry;

    @OneToOne
    @JoinColumn(name = "ACCOMPANY_PERSONAL_ID")
    private User accompanyPersonal;

    @ManyToOne
    @JoinColumn(name = "ENTRY_PLACE_ID")
    private Place entryPlaceId;

    @Column(name = "WS_EDUCATION")
    private int wsEducation;

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

    public void setAccompanyPersonal(User accompanyPersonal) {
        this.accompanyPersonal = accompanyPersonal;
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