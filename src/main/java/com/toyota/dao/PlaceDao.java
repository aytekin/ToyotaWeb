package com.toyota.dao;


import com.toyota.domain.Place;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class PlaceDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void persist(Place place){
        entityManager.persist(place);
    }
    public void merge(Place place){
        entityManager.merge(place);
    }
    public void remove(Place place){
        entityManager.remove(place);
    }

    public Place find(int id) {
        return entityManager.find(Place.class, id);
    }

    public List<Place> findAll() {
        return entityManager.createNamedQuery("Place.findAll", Place.class).getResultList();
    }
}