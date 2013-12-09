package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomMbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 		roomNo;
	protected String		mbrId;
	protected String		roomMbrId;
	protected String		frndRelId;
	protected int			roomMbrRank;
	protected String		mbrName;
	protected String		mbrPhoneNo;
	protected String		mbrPhotoUrl;
	protected String		roomMbrName;
	protected String		roomMbrPhotoUrl;
	protected String		frndRelName;
	protected String		gcmRegId;

	public String getGcmRegId() {
		return gcmRegId;
	}
	public RoomMbr setGcmRegId(String gcmRegId) {
		this.gcmRegId = gcmRegId;
		return this;
	}
	public int getRoomNo() {
		return roomNo;
	}
	public RoomMbr setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public String getMbrId() {
		return mbrId;
	}
	public RoomMbr setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getRoomMbrId() {
		return roomMbrId;
	}
	public RoomMbr setRoomMbrId(String roomMbrId) {
		this.roomMbrId = roomMbrId;
		return this;
	}
	public String getFrndRelId() {
		return frndRelId;
	}
	public RoomMbr setFrndRelId(String frndRelId) {
		this.frndRelId = frndRelId;
		return this;
	}
	public int getRoomMbrRank() {
		return roomMbrRank;
	}
	public RoomMbr setRoomMbrRank(int roomMbrRank) {
		this.roomMbrRank = roomMbrRank;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public RoomMbr setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhoneNo() {
		return mbrPhoneNo;
	}
	public RoomMbr setMbrPhoneNo(String mbrPhoneNo) {
		this.mbrPhoneNo = mbrPhoneNo;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public RoomMbr setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	public String getRoomMbrName() {
		return roomMbrName;
	}
	public RoomMbr setRoomMbrName(String roomMbrName) {
		this.roomMbrName = roomMbrName;
		return this;
	}
	public String getRoomMbrPhotoUrl() {
		return roomMbrPhotoUrl;
	}
	public RoomMbr setRoomMbrPhotoUrl(String roomMbrPhotoUrl) {
		this.roomMbrPhotoUrl = roomMbrPhotoUrl;
		return this;
	}
	public String getFrndRelName() {
		return frndRelName;
	}
	public RoomMbr setFrndRelName(String frndRelName) {
		this.frndRelName = frndRelName;
		return this;
	}

}
