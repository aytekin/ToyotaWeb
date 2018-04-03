package com.toyota.service;


import com.toyota.dao.PlaceDao;
import com.toyota.domain.Place;
import com.toyota.dto.PlaceDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlaceService {
    @Autowired
    private PlaceDao placeDao;

    @Transactional(readOnly = true)
    public List<PlaceDto> findAllPlaces(){
        List<PlaceDto> placeDtoList = new ArrayList<PlaceDto>();
        List<Place> placeList = placeDao.findAll();

        for (Place place : placeList){
            placeDtoList.add(new PlaceDto(place));
        }
        return  placeDtoList;
    }

    @Transactional
    public Place savePlace(PlaceDto placeDto){
        Place place = new Place();
        place.setPlaceName(placeDto.getPlaceName());
        placeDao.persist(place);
        return place;
    }
    @Transactional
    public Place updatePlace(PlaceDto placeDto)
    {
        Place place = placeDao.find(placeDto.getId());
        place.setPlaceName(placeDto.getPlaceName());
        placeDao.merge(place);
        return place;
    }
    @Transactional
    public  void removePlace(Integer id){
        Place place = placeDao.find(id);
        placeDao.remove(place);
    }
}