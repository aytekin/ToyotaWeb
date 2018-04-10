package com.toyota.dto;

import com.toyota.domain.Company;

public class CompanyDto {

    private Integer id;
    private String companyName;

    public CompanyDto() {
    }
    public CompanyDto(int id) {
        this.id = id;
    }
    public CompanyDto(Company company) {
        this.id=company.getCompanyId();
        this.companyName=company.getCompanyName();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
