package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Setting;




public interface SettingService {
		
	void addRange(Setting setting) throws Exception;
	
	void updateRange(Setting setting)throws Exception;

//	void removeFvrtLoc(int fvrtLocNo) throws Exception;

	List<FvrtLoc> getMyFvrtLoc(String mbrId)throws Exception;

	Setting getRange(String mbrId) throws Exception;


}
