package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.services.FeedService;
import net.bitacademy.java41.oldboy.vo.Feed;
import net.bitacademy.java41.oldboy.vo.JsonResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/feed")
public class FeedControl {
	@Autowired ServletContext sc;
	@Autowired FeedService feedService;
	
	@RequestMapping("/feedList")
	@ResponseBody
	public Object getFeedList( int feedRoomNo ) throws Exception {
		
		System.out.println("roomNo: " + feedRoomNo);
		JsonResult jsonResult = new JsonResult();
	
		try {
			jsonResult.setStatus("success")
					   .setData(feedService.getFeedList(feedRoomNo));
				
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
	
	return jsonResult;
}
	

	@RequestMapping(value="/addFeed", method=RequestMethod.POST)
	@ResponseBody
	public Object addFeed(Feed feed) throws Exception {
		System.out.println("피드 :" + feed.getMbrId());
		
		feed.setFeedContent(feed.getFeedContent());
		feed.setFeedRoomNo(feed.getFeedRoomNo());
		feed.setMbrId(feed.getMbrId());
		
		JsonResult jsonResult = new JsonResult();
		
		try {
			jsonResult.setStatus("success")
					   .setData(feedService.addFeed(feed));
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
	
	return jsonResult;
	}

	
	@RequestMapping("/deleteFeed")
	@ResponseBody
	public Object delete(String mbrId, int feedNo) throws Exception {
		
		feedService.deleteFeed(mbrId, feedNo);

		JsonResult jsonResult = new JsonResult();
		
		try {
			jsonResult.setStatus("success");
			
		} catch (Throwable e) {
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}
	
	return jsonResult;
	}
}
