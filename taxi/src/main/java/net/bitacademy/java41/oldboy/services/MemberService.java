package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Mbr;


public interface MemberService {

	void signUp(Mbr mbr) throws Exception ;
	  
    void addFavoritePlace(FvrtLoc fvrtLoc) throws Exception;
    
    List<FvrtLoc> getFavoritePlaces(String mbrId) throws Exception;
    
    void changeFavoritePlaces(FvrtLoc fvrtLocList) throws Exception;	
    
    void removeFavoritePlace(int fvrtLocNo) throws Exception;
	
    void leaveMember(String mbrId) throws Exception;

	Object getRecentDestination(String mbrId) throws Exception;
}
