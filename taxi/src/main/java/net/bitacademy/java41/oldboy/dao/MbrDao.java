package net.bitacademy.java41.oldboy.dao;

import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Mbr;


public interface MbrDao {

	LoginInfo getLoginInfo(String mbrId) throws Exception;

	int signUp(Mbr mbr) throws Exception;

	int deleteMbr(String mbrId) throws Exception;
	
}
