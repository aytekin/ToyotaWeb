package com.toyota.dto;

import com.toyota.domain.City;

public class CityDto {

    private Integer id;
    private String cityName;

    public CityDto() {
    }

    public CityDto(City city) {
        this.id = city.getId();
        this.cityName = city.getCityName();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }
}
