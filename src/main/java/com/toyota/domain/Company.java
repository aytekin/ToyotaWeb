package com.toyota.domain;

import javax.persistence.*;

@Entity
@Table(name = "company")
@NamedQueries({
        @NamedQuery(name = "Company.findAll", query = "SELECT c FROM Company c")
})
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "COMPANY_ID")
    private Integer companyId;

    @Column(name = "COMPANY_NAME")
    private String companyName;

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
