package com.toyota.dao;

import com.toyota.domain.City;
import com.toyota.domain.Company;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class CompanyDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void persist(Company company)
    {
        entityManager.persist(company);
    }
    public  void merge(Company company)
    {
        entityManager.merge(company);
    }
    public void remove(Company company)
    {
        entityManager.remove(company);
    }
    public Company find(int id)
    {
        return  entityManager.find(Company.class,id);
    }
    public List<Company> findAll()
    {
        return  entityManager.createNamedQuery("Company.findAll", Company.class).getResultList();
    }
}
