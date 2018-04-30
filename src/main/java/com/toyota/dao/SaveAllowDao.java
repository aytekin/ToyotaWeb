package com.toyota.dao;

import com.toyota.domain.SaveAllow;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class SaveAllowDao {
    @PersistenceContext
    private EntityManager entityManager;

    public void persist(SaveAllow save)
    {
        entityManager.persist(save);
    }
    public  void merge(SaveAllow save)
    {
        entityManager.merge(save);
    }
    public void remove(SaveAllow save)
    {
        entityManager.remove(save);
    }
    public SaveAllow find(int id)
    {
        return  entityManager.find(SaveAllow.class,id);
    }
    public List<SaveAllow> findAll()
    {
        return  entityManager.createNamedQuery("SaveAllow.findAll", SaveAllow.class).getResultList();
    }
}
