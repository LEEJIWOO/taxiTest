package net.bitacademy.java41.oldboy.services;

import java.util.List;

import net.bitacademy.java41.oldboy.vo.Feed;


public interface FeedService {

	List<Feed> getFeedList(int roomNo) throws Exception;

	int addFeed(Feed feed) throws Exception;

	void deleteFeed(String mbrId, int feedNo) throws Exception;
}
