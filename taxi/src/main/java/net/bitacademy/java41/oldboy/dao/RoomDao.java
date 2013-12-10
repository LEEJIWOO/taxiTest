package net.bitacademy.java41.oldboy.dao;

import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.vo.Room;

public interface RoomDao {
	List<Room> getRoomList(Map<String, Object> paramMap) throws Exception;

	int addRoom(Room room) throws Exception;

	Room getRoomInfo(int roomNo) throws Exception ;

	Room getMyRoom(String mbrId) throws Exception ;

	List<Room> getStartTimeList(String criteriaTime) throws Exception;

}
