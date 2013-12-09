package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;
import java.sql.Date;

import net.bitacademy.java41.oldboy.util.CustomDateSerializer;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;


public class FvrtLoc implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 			fvrtLocNo;
	protected String 		mbrId;
	protected  String		fvrtLocName;
	protected double 		fvrtLocLat;
	protected double 		fvrtLocLng;
	protected Date 			fvrtLocRegDate;
	protected int 			fvrtLocRank;
	protected String			fvrtLocStatus;
	
	public int getFvrtLocNo() {
		return fvrtLocNo;
	}
	public FvrtLoc setFvrtLocNo(int fvrtLocNo) {
		this.fvrtLocNo = fvrtLocNo;
		return this;
	}
	public String getMbrId() {
		return mbrId;
	}
	public FvrtLoc setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public String getFvrtLocName() {
		return fvrtLocName;
	}
	public FvrtLoc setFvrtLocName(String fvrtLocName) {
		this.fvrtLocName = fvrtLocName;
		return this;
	}
	public double getFvrtLocLat() {
		return fvrtLocLat;
	}
	public FvrtLoc setFvrtLocLat(double fvrtLocLat) {
		this.fvrtLocLat = fvrtLocLat;
		return this;
	}
	public double getFvrtLocLng() {
		return fvrtLocLng;
	}
	public FvrtLoc setFvrtLocLng(double fvrtLocLng) {
		this.fvrtLocLng = fvrtLocLng;
		return this;
	}
	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getFvrtLocRegDate() {
		return fvrtLocRegDate;
	}
	public FvrtLoc setFvrtLocRegDate(Date fvrtLocRegDate) {
		this.fvrtLocRegDate = fvrtLocRegDate;
		return this;
	}
	public int getFvrtLocRank() {
		return fvrtLocRank;
	}
	public FvrtLoc setFvrtLocRank(int fvrtLocRank) {
		this.fvrtLocRank = fvrtLocRank;
		return this;
	}
	public String getFvrtLocStatus() {
		return fvrtLocStatus;
	}
	public FvrtLoc setFvrtLocStatus(String fvrtLocStatus) {
		this.fvrtLocStatus = fvrtLocStatus;
		return this;
	}
	
	
}
