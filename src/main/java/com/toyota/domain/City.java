package com.toyota.domain;

import javax.persistence.*;

@Entity
@Table(name = "city")
@NamedQueries({
        @NamedQuery(name = "City.findAll", query = "SELECT c FROM City c")
})
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "CITY_ID")
    private Integer id;

    @Column(name = "CITY_NAME")
    private String cityName;

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
