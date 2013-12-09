package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.FvrtLocDao;
import net.bitacademy.java41.oldboy.dao.SettingDao;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Setting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SettingServiceImpl implements SettingService {
	@Autowired FvrtLocDao fvrtLocDao;
	@Autowired SettingDao settingDao;
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void addRange(Setting setting) throws Exception {
		try{
			settingDao.addRange(setting);	
		}catch(Throwable e){
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void updateRange(Setting setting) throws Exception {
		settingDao.updateRange(setting);
	}

//	@Transactional(
//			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
//	public void removeFvrtLoc(int fvrtLocNo)throws Exception {
//		fvrtLocDao.deleteFvrtLoc(fvrtLocNo);
//	}

	@Override
	public List<FvrtLoc> getMyFvrtLoc(String mbrId) throws Exception {
		Map<String, String> paramsMap = new HashMap<String, String>();
    	paramsMap.put("mbrId", mbrId);
    	paramsMap.put("fvrtLocStatus", "F");
    	
		return fvrtLocDao.getFvrtLoc(paramsMap);
	}
	@Override
	public Setting getRange(String mbrId) throws Exception {
		
		return settingDao.getRange(mbrId);
	}
	
}
