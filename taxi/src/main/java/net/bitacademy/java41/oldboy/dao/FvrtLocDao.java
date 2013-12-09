package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.FvrtLoc;

public interface FvrtLocDao {

	List<FvrtLoc> getFvrtLoc(Map<String, String> paramsMap) throws Exception;
	 
    int addFvrtLoc(FvrtLoc fvrtLoc);
    
    int deleteFvrtLoc(String mbrId) throws Exception;

    int getFvrtLocMaxRank(String mbrId) throws Exception;
    
    void updateFvrtLocRank(FvrtLoc fvrtLocList) throws Exception;

	void deleteFvrtLocItem(int fvrtLocNo) throws Exception;
	
	int deleteAllFvrtLoc(String mbrId) throws Exception;
	
//	FvrtLoc get(int no)throws Exception;
}
