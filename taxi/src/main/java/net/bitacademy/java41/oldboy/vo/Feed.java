package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.util.Date;

import net.bitacademy.java41.oldboy.util.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

public class Feed implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			feedNo;
	protected String 		feedContent;
	protected String			mbrId;
	protected String			mbrName;
	protected String			mbrPhotoUrl;
	protected Date			feedRegDate;
	protected int 			feedRoomNo;
	
	public int getFeedNo() {
		return feedNo;
	}
	public Feed setFeedNo(int feedNo) {
		this.feedNo = feedNo;
		return this;
	}
	public String getFeedContent() {
		return feedContent;
	}
	public Feed setFeedContent(String feedContent) {
		this.feedContent = feedContent;
		return this;
	}
	public String getMbrId() {
		return mbrId;
	}
	public Feed setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public Feed setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public Feed setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getFeedRegDate() {
		return feedRegDate;
	}
	public Feed setFeedRegDate(Date feedRegDate) {
		this.feedRegDate = feedRegDate;
		return this;
	}
	public int getFeedRoomNo() {
		return feedRoomNo;
	}
	public Feed setFeedRoomNo(int feedRoomNo) {
		this.feedRoomNo = feedRoomNo;
		return this;
	}
		
}
