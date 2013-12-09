package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class Frnd implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String 	mbrId;
	protected int 		frndId;
	protected String 	frndName;
	protected String 	frndPhotoUrl;
	
	public String getMbrId() {
		return mbrId;
	}
	public Frnd setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public int getFrndId() {
		return frndId;
	}
	public Frnd setFrndId(int frndId) {
		this.frndId = frndId;
		return this;
	}
	public String getFrndName() {
		return frndName;
	}
	public Frnd setFrndName(String frndName) {
		this.frndName = frndName;
		return this;
	}
	public String getFrndPhotoUrl() {
		return frndPhotoUrl;
	}
	public Frnd setFrndPhotoUrl(String frndPhotoUrl) {
		this.frndPhotoUrl = frndPhotoUrl;
		return this;
	}
	
}
