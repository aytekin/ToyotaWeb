package com.toyota.service;

import com.toyota.dao.RfentryDao;
import com.toyota.domain.Rfentry;
import com.toyota.dto.RfentryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class RfentryService {
    @Autowired
    private RfentryDao rfentryDao;

    @Transactional
    public List<RfentryDto> findAllRfentry(){
        List<RfentryDto> rfentryDtoList = new ArrayList<RfentryDto>();

        List<Rfentry> rfentryList = rfentryDao.findAll();
        for(Rfentry rfentry : rfentryList){
            rfentryDtoList.add(new RfentryDto(rfentry));
        }
        return rfentryDtoList;

    }

    @Transactional
    public Rfentry saveRfentry(RfentryDto rfentryDto){
        Rfentry rfentry = new Rfentry();
        rfentry.setRfentryName(rfentryDto.getRfentryName());
        rfentryDao.persist(rfentry);
        return rfentry;
    }

    @Transactional
    public Rfentry updateRfentry(RfentryDto rfentryDto){
        Rfentry rfentry = rfentryDao.find(rfentryDto.getId());
        rfentry.setRfentryName(rfentryDto.getRfentryName());
        rfentryDao.merge(rfentry);
        return rfentry;


    }

    @Transactional
    public void removeRfentry(Integer id){
        Rfentry rfentry = rfentryDao.find(id);
        rfentryDao.remove(rfentry);

    }

}
