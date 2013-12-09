package net.bitacademy.java41.oldboy.services;

import java.io.EOFException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.logging.Level;
import java.util.logging.Logger;

import net.bitacademy.java41.oldboy.dao.FeedDao;
import net.bitacademy.java41.oldboy.dao.RoomMbrDao;
import net.bitacademy.java41.oldboy.vo.Feed;
import net.bitacademy.java41.oldboy.vo.RoomMbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.google.android.gcm.server.Constants;
import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.MulticastResult;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;

@Service
public class FeedServiceImpl implements FeedService {

	@Autowired FeedDao feedDao;
	@Autowired RoomMbrDao roomMbrDao;
	@Autowired PlatformTransactionManager txManager;

	public static final String TAG = "sendManager";
	private static final Executor threadPool = Executors.newFixedThreadPool(5);
	  private static final Logger logger =
		      Logger.getLogger(FeedServiceImpl.class.getName());
	public static final String APT_KEY = "AIzaSyBHxl2tGP3w99WhLk6UpC3F4x6L79ZdkXM";

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
		try{
			feedDao.addFeed(feed);
			feedNo = feed.getFeedNo();
			Map <String, Object> paramMap = new HashMap<String, Object>();
			paramMap.put("roomNo", feed.getFeedRoomNo());
			paramMap.put("mbrId", feed.getMbrId());

			if(feedNo > 0){
				final List<RoomMbr> list =  roomMbrDao.getRoomDtlList(paramMap);
				asyncSend(list);
//				for(i = 0; i < list.size(); i++){
//					sendPush(list.get(i).getGcmRegId());
//					System.out.println("Push("+ i + "):" + list.get(i).getGcmRegId());
//				}
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

//	private void sendPush(String regId) {
//			String contents = "참여중인 방에 댓글이 추가되었습니다.";
//	        Sender sender = new Sender(APT_KEY);
//	        Message msg = new Message.Builder().addData("message", contents).build();
//
//	        Result result;
//	        try {
//	            result = sender.send(msg, regId, 5);
//	            if (result.getMessageId() != null) {
//	                // 푸쉬 전송 성공
//	                System.out.println("푸쉬 전송 성공");
//	            } else {
//	                String error = result.getErrorCodeName();
//	                if (Constants.ERROR_INTERNAL_SERVER_ERROR.equals(error)) {
//	                    // 구글 푸시 서버 에러
//	                    System.out.println("구글 푸시 서버 에러");
//	                }
//	            }
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            System.out.println("e:" + e.toString());
//	     }
//	}


	 private void asyncSend(List<RoomMbr> list) throws IOException, EOFException {
		    // make a copy
		    final List<String> regList = new ArrayList<String>();
		    for(int i = 0; i < list.size(); i++){
		    	regList.add(list.get(i).getGcmRegId());
		    	System.out.println("GCM_REG_ID(" + i + ") : " + regList.get(i).toString());
		    }

		    threadPool.execute(new Runnable() {
		    Sender sender = new Sender(APT_KEY);
		 	String contents = "참여중인 방에 댓글이 추가되었습니다.";
		    Message message = new Message.Builder().addData("message", contents).build();

		    public void run() {

		        MulticastResult multicastResult;
		        try {
		          multicastResult = sender.send(message, regList, 5);
		        } catch (IOException e) {
		          logger.log(Level.SEVERE, "Error posting messages", e);
		          return;
		        }
		        List<Result> results = multicastResult.getResults();
		        // analyze the results
		        for (int i = 0; i < regList.size(); i++) {
		          String regId = regList.get(i);
		          Result result = results.get(i);
		          String messageId = result.getMessageId();
		          if (messageId != null) {
		        	System.out.println("Succesfully sent message to device:" + regId + messageId);
		        	logger.fine("Succesfully sent message to device: " + regId +
		                    "; messageId = " + messageId);
		          } else {
		            String error = result.getErrorCodeName();
		            if (error.equals(Constants.ERROR_NOT_REGISTERED)) {
		            	logger.info("Unregistered device: " + regId);
		            } else {
		            	logger.severe("Error sending message to " + regId + ": " + error);
		            }
		          }
		        }
		      }});
		  }


}
