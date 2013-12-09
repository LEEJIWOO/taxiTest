package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Frnd;

public interface FrndDao {

	void addFrndList(List<Frnd> list);
	
	int deleteFrnd(String mbrId) throws Exception;

}
