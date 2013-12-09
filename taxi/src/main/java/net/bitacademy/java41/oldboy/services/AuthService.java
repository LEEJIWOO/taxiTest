package net.bitacademy.java41.oldboy.services;

import net.bitacademy.java41.oldboy.vo.LoginInfo;


public interface AuthService {
	
	LoginInfo getLoginInfo(String mbrId) throws Exception ;;

}
