package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.util.List;

public class LoginInfo implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String		mbrId;
	protected String 		mbrName;
	protected String 		mbrPhoneNo;
	protected String 		mbrPhotoUrl;
	protected String 		mbrGender;
	protected List<Frnd>	frndList;
	protected int			startRange;
	protected int			endRange;
	
	public LoginInfo setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrId() {
		return mbrId;
	}
	public LoginInfo setMbrEmail(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public LoginInfo setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhoneNo() {
		return mbrPhoneNo;
	}
	public LoginInfo setMbrPhoneNo(String mbrPhoneNo) {
		this.mbrPhoneNo = mbrPhoneNo;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public LoginInfo setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	public String getMbrGender() {
		return mbrGender;
	}
	public LoginInfo setMbrGender(String mbrGender) {
		this.mbrGender = mbrGender;
		return this;
	}
	public LoginInfo setFrndList(List<Frnd> frndList) {
		this.frndList = frndList;
		return this;
	}
	public List<Frnd> getFrndList() {
		return frndList;
	}
	public int getStartRange() {
		return startRange;
	}
	public LoginInfo setStartRange(int startRange) {
		this.startRange = startRange;
		return this;
	}
	public int getEndRange() {
		return endRange;
	}
	public LoginInfo setEndRange(int endRange) {
		this.endRange = endRange;
		return this;
	}
}
