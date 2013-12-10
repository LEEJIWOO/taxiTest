package net.bitacademy.java41.oldboy.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.vo.Feed;
import net.bitacademy.java41.oldboy.vo.RoomMbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedServiceImpl implements FeedService {

	@Autowired FeedDao feedDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired PlatformTransactionManager txManager;
	@Autowired GcmService gcmService;

	public List<Feed> getFeedList(int roomNo) throws Exception {
		try{
			return feedDao.getFeedList(roomNo);

		} catch(Exception e ) {
			throw e;
		}
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public int addFeed(Feed feed) throws Exception {
		int feedNo = 0;
		boolean request = false;
		try{
			feedDao.addFeed(feed);
			feedNo = feed.getFeedNo();
			Map <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("roomNo", feed.getFeedRoomNo());
			paramMap.put("mbrId", feed.getMbrId());

			if(feedNo > 0){
				final List<RoomMbr> list =  roomMbrDao.getRoomDtlList(paramMap);
				gcmService.asyncSend(list, request);
			}
		} catch(Exception e ) {
			throw e;
		}
		return feedNo;
	}

	@Transactional(
			propagation=Propagation.REQUIRED, rollbackFor=Throwable.class)
	public void deleteFeed(String mbrId, int feedNo) throws Exception {
		try{
			System.out.println("delete Service : " + mbrId + feedNo);
			HashMap <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("mbrId", mbrId);
			paramMap.put("feedNo", feedNo);

			feedDao.deleteFeed(paramMap);

		} catch(Exception e ) {
			throw e;
		}
	}

}
