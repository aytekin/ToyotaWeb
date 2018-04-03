package com.toyota.dao;

import com.toyota.domain.City;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class CityDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void persist(City city) {
        entityManager.persist(city);
    }

    public void merge(City city) {
        entityManager.merge(city);
    }

    public void remove(City city) {
        entityManager.remove(city);
    }

    public City find(int id) {
        return entityManager.find(City.class, id);
    }

    public List<City> findAll() {
        return entityManager.createNamedQuery("City.findAll", City.class).getResultList();
    }
}