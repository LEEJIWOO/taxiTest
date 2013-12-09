package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;


public class Setting implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String			mbrId;
	protected int		 		startRange;
	protected int		 		endRange;
	
	public String getMbrId() {
		return mbrId;
	}
	public Setting setMbrId(String mbrId) {
		this.mbrId = mbrId;
		return this;
	}
	public int getStartRange() {
		return startRange;
	}
	public Setting setStartRange(int startRange) {
		this.startRange = startRange;
		return this;
	}
	public int getEndRange() {
		return endRange;
	}
	public Setting setEndRange(int endRange) {
		this.endRange = endRange;
		return this;
	}
	

}
