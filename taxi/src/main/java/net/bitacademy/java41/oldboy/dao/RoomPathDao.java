package net.bitacademy.java41.oldboy.dao;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.RoomPath;



public interface RoomPathDao {

	void addRoomPathList(List<RoomPath> roomPathList) throws Exception;

	List<RoomPath> getRoomPathList(int roomNo) throws Exception;


}
