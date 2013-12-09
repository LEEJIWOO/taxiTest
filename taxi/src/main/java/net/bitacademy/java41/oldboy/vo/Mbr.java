package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import net.bitacademy.java41.oldboy.util.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;


public class Mbr implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String			mbrId;
	protected String 		mbrName;
	protected String 		mbrPhoneNo;
	protected String 		mbrPhotoUrl;
	protected String 		mbrGender;
	protected Date 			mbrRegDate;
	protected List<Frnd>	frndList;
	
	public List<Frnd> getFrndList() {
		return frndList;
	}
	public Mbr setFrndList(List<Frnd> frndList) {
		this.frndList = frndList;
		return this;
	}
	
	public String getMbrId() {
		return mbrId;
	}
	public Mbr setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getMbrName() {
		return mbrName;
	}
	public Mbr setMbrName(String mbrName) {
		this.mbrName = mbrName;
		return this;
	}
	public String getMbrPhoneNo() {
		return mbrPhoneNo;
	}
	public Mbr setMbrPhoneNo(String mbrPhoneNo) {
		this.mbrPhoneNo = mbrPhoneNo;
		return this;
	}
	public String getMbrPhotoUrl() {
		return mbrPhotoUrl;
	}
	public Mbr setMbrPhotoUrl(String mbrPhotoUrl) {
		this.mbrPhotoUrl = mbrPhotoUrl;
		return this;
	}
	public String getMbrGender() {
		return mbrGender;
	}
	public Mbr setMbrGender(String mbrGender) {
		this.mbrGender = mbrGender;
		return this;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getMbrRegDate() {
		return mbrRegDate;
	}
	public Mbr setMbrRegDate(Date mbrRegDate) {
		this.mbrRegDate = mbrRegDate;
		return this;
	}
		
}
