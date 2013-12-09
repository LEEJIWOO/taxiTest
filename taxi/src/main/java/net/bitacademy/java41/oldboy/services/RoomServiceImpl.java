package net.bitacademy.java41.oldboy.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.FvrtLocDao;
import net.bitacademy.java41.oldboy.dao.RoomDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.dao.RoomPathDao;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.Room;
import net.bitacademy.java41.oldboy.vo.RoomMbr;
import net.bitacademy.java41.oldboy.vo.RoomPath;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RoomServiceImpl implements RoomService {
	@Autowired RoomDao roomDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired RoomPathDao roomPathDao;
	@Autowired FvrtLocDao fvrtLocDao;
	@Autowired PlatformTransactionManager txManager;

	public List<Room> searchRooms( String mbrId,
			double startLat, double startLng, int startRange,
			double endLat, double endLng, int endRange
			) throws Exception {

		Map<String, Object> paramMap  = new HashMap<String, Object>();
		paramMap.put("mbrId", mbrId);
		paramMap.put("startLat", startLat);
		paramMap.put("startLng", startLng);
		paramMap.put("startRange", startRange);
		paramMap.put("endLat", endLat);
		paramMap.put("endLng", endLng);
		paramMap.put("endRange", endRange);

		List<Room> searchRoomList = roomDao.getRoomList(paramMap);

//		for( int i = 0; i < searchRoomList.size(); i++ ) {
//			searchRoomList.get(i).setPathLocList(
//					pathLocDao.getPathLocList(searchRoomList.get(i).getRoomNo()) );
//			searchRoomList.get(i).setRoomMbrList(
//					roomMbrDao.getRoomMbrList(searchRoomList.get(i).getRoomNo()) );
//		}

		return searchRoomList;
	}


	public boolean isRoomMbr(String memberId) throws Exception {
		try {
			int count = roomMbrDao.isRoomMbr(memberId);

			if (count > 0) {
				return true;
			} else {
				return false;
			}

		} catch (Exception e) {
			throw e;
		}
	}


	@Transactional( propagation=Propagation.REQUIRED, rollbackFor=Throwable.class )
	public int addRoom(
			Room room,
			RoomPath startPath,
			RoomPath endPath,
			RoomMbr roomMbr,
			FvrtLoc fvrtLoc ) throws Exception {
        try {
            roomDao.addRoom(room);
            int roomNo = room.getRoomNo();

            List<RoomPath> roomPathList = new ArrayList<RoomPath>();
            roomPathList.add( startPath.setRoomNo(roomNo) );
            roomPathList.add( endPath.setRoomNo(roomNo) );
            roomPathDao.addRoomPathList( roomPathList );

            roomMbr.setRoomNo(roomNo);
            roomMbrDao.addRoomMbr( roomMbr );

            fvrtLocDao.addFvrtLoc( fvrtLoc );



            return roomNo;

        } catch (Exception e) {
            throw e;
        }
    }


	@Transactional( propagation=Propagation.REQUIRED, rollbackFor=Throwable.class )
	public void joinRoom(RoomMbr roomMbr, FvrtLoc fvrtLoc) throws Exception {
        try {
        	roomMbr = roomMbrDao.getVirtualRoomMbr(roomMbr);
        	System.out.println(roomMbr.getGcmRegId());
        	roomMbrDao.addRoomMbr(roomMbr);

        	fvrtLocDao.addFvrtLoc( fvrtLoc );

        } catch (Exception e) {
            throw e;
        }
    }


	public Room getRoomInfo( int roomNo ) throws Exception {
		Room roomInfo = roomDao.getRoomInfo(roomNo);
		List<RoomMbr> roomMbrInfo = roomMbrDao.getRoomMbrInfo( roomInfo.getRoomNo() );
		roomInfo.setRoomMbrCount( roomMbrInfo.size() );
		List<RoomPath> roomPathInfo = roomPathDao.getRoomPathList( roomInfo.getRoomNo() );

		roomInfo.setRoomMbrList(roomMbrInfo);
		roomInfo.setRoomPathList(roomPathInfo);

		return roomInfo;

	}


	public Room getMyRoom(String mbrId) throws Exception {
		return roomDao.getMyRoom(mbrId);
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void outRoom(String mbrId, int roomNo) throws Exception {
		try{
			Map <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("mbrId", mbrId);
			paramMap.put("roomNo", roomNo);

			System.out.println(" 서비스 ");
			roomMbrDao.outRoom(paramMap);
		} catch(Exception e ) {
			throw e;
		}
	}



}
