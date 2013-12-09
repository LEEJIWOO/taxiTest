package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.FrndDao;
import net.bitacademy.java41.oldboy.dao.FvrtLocDao;
import net.bitacademy.java41.oldboy.dao.MbrDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.dao.SettingDao;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Mbr;
import net.bitacademy.java41.oldboy.vo.Setting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberServiceImpl implements MemberService {
	@Autowired FrndDao 		frndDao;  
    @Autowired FvrtLocDao 	fvrtLocDao;  
    @Autowired FeedDao 		feedDao; 
    @Autowired RoomMbrDao 	roomMbrDao; 
    @Autowired SettingDao 	settingDao; 
    @Autowired MbrDao 		mbrDao; 
    @Autowired PlatformTransactionManager txManager; 
	
	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void signUp(Mbr mbr) throws Exception {
		mbrDao.signUp(mbr);
		frndDao.addFrndList(mbr.getFrndList());
		Setting setting = new Setting()
									.setMbrId( mbr.getMbrId() )
									.setStartRange( 500 )
									.setEndRange( 1000 );
		settingDao.addSetting(setting);
	}
	
	
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Throwable.class) 
	public void leaveMember(String mbrId) throws Exception{ 
    	HashMap <String, Object> paramMap = new HashMap<String, Object>();
    	paramMap.put("mbrId", mbrId);
    	paramMap.put("feedNo", null);
    	
    	feedDao.deleteFeed(paramMap);  
        roomMbrDao.deleteRoomMbr(mbrId); 
        frndDao.deleteFrnd(mbrId);
        fvrtLocDao.deleteAllFvrtLoc(mbrId); 
        settingDao.deleteSetting(mbrId);
        mbrDao.deleteMbr(mbrId); 
        
	}
	
	
    @Transactional( propagation=Propagation.REQUIRED, rollbackFor=Throwable.class ) 
    @Override
    public void addFavoritePlace(FvrtLoc fvrtLoc) throws Exception { 
        // Rank 가져와서 추가
        fvrtLoc.setFvrtLocRank(fvrtLocDao.getFvrtLocMaxRank(fvrtLoc.getMbrId()) + 1);
    	fvrtLoc.setFvrtLocStatus("F"); 

         fvrtLocDao.addFvrtLoc(fvrtLoc); 
    }
	
    
	public List<FvrtLoc> getFavoritePlaces(String mbrId) throws Exception { 
    	Map<String, String> paramsMap = new HashMap<String, String>();
    	paramsMap.put("mbrId", mbrId);
    	paramsMap.put("fvrtLocStatus", "F");
    	return fvrtLocDao.getFvrtLoc(paramsMap); 
    } 
	
	
	@Transactional(propagation=Propagation.REQUIRED,rollbackFor=Throwable.class)
	public void changeFavoritePlaces(FvrtLoc fvrtLocList) throws Exception {
		fvrtLocDao.updateFvrtLocRank(fvrtLocList);
	}
	
	
    @Transactional(
            propagation=Propagation.REQUIRED, rollbackFor=Throwable.class )
    public void removeFavoritePlace(int fvrtLocNo)throws Exception {
    	fvrtLocDao.deleteFvrtLocItem(fvrtLocNo);
    }
  

	public Object getRecentDestination(String mbrId) throws Exception {
    	Map<String, String> paramsMap = new HashMap<String, String>();
    	paramsMap.put("mbrId", mbrId);
    	paramsMap.put("fvrtLocStatus", "R");
    	return fvrtLocDao.getFvrtLoc(paramsMap); 
    } 

}
