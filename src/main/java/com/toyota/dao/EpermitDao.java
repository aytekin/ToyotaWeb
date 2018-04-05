package com.toyota.dao;

import com.toyota.domain.Epermit;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
@Repository
public class EpermitDao {
    @PersistenceContext
    private EntityManager entityManager;

    public void persist(Epermit epermit)
    {
        entityManager.persist(epermit);
    }
    public  void merge(Epermit epermit)
    {
        entityManager.merge(epermit);
    }
    public void remove(Epermit epermit)
    {
        entityManager.remove(epermit);
    }
    public Epermit find(int id)
    {
        return  entityManager.find(Epermit.class,id);
    }
    public List<Epermit> findAll()
    {
        return  entityManager.createNamedQuery("Epermit.findAll", Epermit.class).getResultList();
    }
}
