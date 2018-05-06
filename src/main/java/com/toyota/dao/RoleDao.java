package com.toyota.dao;

import com.toyota.domain.Role;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
public class RoleDao {

    @PersistenceContext
    private EntityManager entityManager;

    public Role findByRoleName(String name){return entityManager.createNamedQuery("Role.findByRoleName", Role.class).setParameter("name", name).getSingleResult();}
}
