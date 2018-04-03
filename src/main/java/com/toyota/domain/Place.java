package com.toyota.domain;


import javax.persistence.*;

@Entity
@Table(name="place")
@NamedQueries({
        @NamedQuery(name="Place.findAll",query ="SELECT p FROM Place p")
})
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="PLACE_ID")
    private int placeId;

    @Column(name="PLACE_NAME")
    private String placeName;

    public int getPlaceId() {
        return placeId;
    }

    public void setPlaceId(int placeId)
    {
        this.placeId = placeId;
    }

    public String getPlaceName()
    {
        return placeName;
    }

    public void setPlaceName(String placeName)
    {
        this.placeName = placeName;
    }
}