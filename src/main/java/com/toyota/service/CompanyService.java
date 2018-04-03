package com.toyota.service;

import com.toyota.dao.CompanyDao;
import com.toyota.domain.Company;
import com.toyota.dto.CompanyDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompanyService {
    @Autowired
    private CompanyDao companyDao;

    @Transactional(readOnly = true)
    public List<CompanyDto> findAllCompanies()
    {
        List<CompanyDto> companyDtoList = new ArrayList<CompanyDto>();

        List<Company> companyList = companyDao.findAll();

        for(Company company : companyList)
        {
            companyDtoList.add(new CompanyDto(company));
        }
        return  companyDtoList;
    }
    @Transactional
    public Company saveCompany(CompanyDto companyDto)
    {
        Company company = new Company();
        company.setCompanyName(companyDto.getCompanyName());
        companyDao.persist(company);
        return company;
    }
    @Transactional
    public Company uptadeCompany(CompanyDto companyDto)
    {
        Company company = companyDao.find(companyDto.getId());
        company.setCompanyName(companyDto.getCompanyName());
        companyDao.merge(company);
        return company;
    }
    @Transactional
    public void removeCompany(Integer id)
    {
        Company company = companyDao.find(id);
        companyDao.remove(company);
    }
}

