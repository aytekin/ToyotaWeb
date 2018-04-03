package com.toyota.dao;

import com.toyota.domain.Rfentry;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;


@Repository
public class RfentryDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void persist(Rfentry rfentry) {
        entityManager.persist(rfentry);
    }

    public void merge(Rfentry rfentry) {
        entityManager.merge(rfentry);
    }

    public void remove(Rfentry rfentry) {
        entityManager.remove(rfentry);
    }

    public Rfentry find(int id) {
        return entityManager.find(Rfentry.class, id);
    }

    public List<Rfentry> findAll() {
        return entityManager.createNamedQuery("Rfentry.findAll", Rfentry.class).getResultList();
    }
}
