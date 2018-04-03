package com.toyota.dao;

import com.toyota.domain.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class UserDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void persist(User user){entityManager.persist(user);}
    public void merge(User user){entityManager.merge(user);}
    public void remove(User user){entityManager.remove(user);}
    public User find(int id){return entityManager.find(User.class,id);}
    public List<User> findAll(){return entityManager.createNamedQuery("User.findAll", User.class).getResultList();}
}
