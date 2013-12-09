package net.bitacademy.java41.oldboy.dao;

import net.bitacademy.java41.oldboy.vo.Setting;




public interface SettingDao {
	
	void addSetting(Setting setting) throws Exception;
	
	void addRange(Setting setting) throws Exception;
	
	void updateRange(Setting setting) throws Exception;
	
	int deleteFvrtLoc(int fvrtLocNo) throws Exception;
	
	int deleteSetting(String mbrId) throws Exception;
	
	Setting getRange(String mbrId) throws Exception;
}
