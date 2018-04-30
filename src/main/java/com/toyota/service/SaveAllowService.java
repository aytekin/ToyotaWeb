package com.toyota.service;

import com.toyota.dao.SaveAllowDao;
import com.toyota.domain.SaveAllow;
import com.toyota.dto.SaveAllowDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class SaveAllowService {
    @Autowired
    private SaveAllowDao saveAllowDao;

    @Transactional(readOnly = true)
    public List<SaveAllowDto> findAllSaveAllowes()
    {
        List<SaveAllowDto> saveAllowDtoList = new ArrayList<SaveAllowDto>();
        List<SaveAllow> saveAllowList = saveAllowDao.findAll();
        for(SaveAllow saveAllow:saveAllowList)
        {
            saveAllowDtoList.add(new SaveAllowDto(saveAllow));
        }
        return saveAllowDtoList;
    }
    @Transactional
    public SaveAllow saveAllow(SaveAllowDto saveAllowDto)
    {
        SaveAllow saveAllow = new SaveAllow();
        saveAllow.setEpermitId(saveAllowDto.getEpermitId());
        saveAllow.setSaveEntryTime(saveAllowDto.getSaveEntryTime());
        saveAllow.setSaveExitTime(saveAllowDto.getSaveExitTime());
        saveAllow.setSaveDate(saveAllowDto.getSaveDate());
        saveAllowDao.persist(saveAllow);
        return saveAllow;
    }
    @Transactional
    public SaveAllow updateSaveAllow(SaveAllowDto saveAllowDto)
    {
        SaveAllow saveAllow = saveAllowDao.find(saveAllowDto.getSaveAllowId());
        saveAllow.setEpermitId(saveAllowDto.getEpermitId());
        saveAllow.setSaveEntryTime(saveAllowDto.getSaveEntryTime());
        saveAllow.setSaveExitTime(saveAllowDto.getSaveExitTime());
        saveAllow.setSaveDate(saveAllowDto.getSaveDate());
        saveAllowDao.merge(saveAllow);
        return saveAllow;
    }
    @Transactional
    public void removeSaveAllow(Integer id)
    {
        SaveAllow saveAllow = saveAllowDao.find(id);
        saveAllowDao.remove(saveAllow);
    }
}
