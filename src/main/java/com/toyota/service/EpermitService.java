package com.toyota.service;

import com.toyota.dao.EpermitDao;
import com.toyota.domain.Epermit;
import com.toyota.dto.EpermitDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service
public class EpermitService {
    @Autowired
    private EpermitDao epermitDao;

    @Transactional(readOnly = true)
    public List<EpermitDto> findAllEpermits()
    {
        List<EpermitDto> epermitDtoList = new ArrayList<EpermitDto>();

        List<Epermit> epermitList = epermitDao.findAll();

        for(Epermit epermit : epermitList)
        {
            epermitDtoList.add(new EpermitDto(epermit));
        }
        return  epermitDtoList;
    }
    @Transactional
    public Epermit saveEpermit(EpermitDto epermitDto)
    {
        Epermit epermit = new Epermit();
        epermit.setEnterTime(epermitDto.getEnterTime());
        epermit.setEntryDate(epermitDto.getEntryDate());
        epermit.setExitDate(epermitDto.getExitDate());
        epermit.setExitTime(epermitDto.getExitTime());
        epermit.setEpermit_names(epermitDto.getEpermit_names());
        epermit.setEntryCompany(epermitDto.getEntryCompany());
        epermit.setAccompanyPersonal(epermitDto.getAccompanyPersonal());
        epermit.setWsEducation(epermitDto.getWsEducation());
        epermit.setReasonfentry(epermitDto.getReasonfentry());

        epermitDao.persist(epermit);
        return epermit;
    }

    @Transactional
    public Epermit uptadeEpermit(EpermitDto epermitDto)
    {
        Epermit epermit = epermitDao.find(epermitDto.getEpermitId());

        epermit.setEnterTime(epermitDto.getEnterTime());
        epermit.setEntryDate(epermitDto.getEntryDate());
        epermit.setExitDate(epermitDto.getExitDate());
        epermit.setExitTime(epermitDto.getExitTime());
        epermit.setEpermit_names(epermitDto.getEpermit_names());
        epermit.setEntryCompany(epermitDto.getEntryCompany());
        epermit.setAccompanyPersonal(epermitDto.getAccompanyPersonal());
        epermit.setWsEducation(epermitDto.getWsEducation());
        epermit.setReasonfentry(epermitDto.getReasonfentry());

        epermitDao.merge(epermit);
        return epermit;
    }
    @Transactional
    public void removeEpermit(Integer id)
    {
        Epermit epermit = epermitDao.find(id);
        epermitDao.remove(epermit);
    }
}
