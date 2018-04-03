package com.toyota.service;

import com.toyota.dao.CityDao;
import com.toyota.domain.City;
import com.toyota.dto.CityDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class CityService {
    @Autowired
    private CityDao cityDao;

    @Transactional(readOnly = true)
    public List<CityDto> findAllCities() {
        List<CityDto> cityDtoList = new ArrayList<CityDto>();

        List<City> cityList = cityDao.findAll();

        for (City city : cityList) {
            cityDtoList.add(new CityDto(city));
        }

        return cityDtoList;
    }

    @Transactional
    public City saveCity(CityDto cityDto) {
        City city = new City();
        city.setCityName(cityDto.getCityName());
        cityDao.persist(city);
        return city;
    }

    @Transactional
    public City updateCity(CityDto cityDto) {
        City city = cityDao.find(cityDto.getId());
        city.setCityName(cityDto.getCityName());
        cityDao.merge(city);
        return city;
    }

    @Transactional
    public void removeCity(Integer id) {
        City city = cityDao.find(id);
        cityDao.remove(city);
    }
}
