package com.toyota.dto;

import com.toyota.domain.Rfentry;

public class RfentryDto {


    private Integer id;

    private String RfentryName;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRfentryName() {
        return RfentryName;
    }

    public void setRfentryName(String rfentryName) {
        RfentryName = rfentryName;
    }

    public RfentryDto() {
    }

    public RfentryDto(Rfentry rfentry) {

        this.id = rfentry.getRfentryId();
        this.RfentryName = rfentry.getRfentryName();
    }

}
