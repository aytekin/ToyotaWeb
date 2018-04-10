package com.toyota.dto;

import com.toyota.domain.Place;

public class PlaceDto {

    private Integer id;
    private String  placeName;

    public PlaceDto(){

    }
    public PlaceDto(int id)
    {
        this.id = id;
    }
    public PlaceDto(Place place){
        this.id=place.getPlaceId();
        this.placeName=place.getPlaceName();
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getPlaceName() {
        return placeName;
    }

    public void setPlaceName(String placeName) {
        this.placeName = placeName;
    }
}
