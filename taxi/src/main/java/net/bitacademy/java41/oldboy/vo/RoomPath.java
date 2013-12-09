package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class RoomPath implements Serializable {
	private static final long serialVersionUID = 1L;

	protected int 				roomNo;
	protected int					pathRank;
	protected String				pathName;
	protected double 			pathLat;
	protected double 			pathLng;
	
	public int getRoomNo() {
		return roomNo;
	}
	public RoomPath setRoomNo(int roomNo) {
		this.roomNo = roomNo;
		return this;
	}
	public int getPathRank() {
		return pathRank;
	}
	public RoomPath setPathRank(int pathRank) {
		this.pathRank = pathRank;
		return this;
	}
	public String getPathName() {
		return pathName;
	}
	public RoomPath setPathName(String pathName) {
		this.pathName = pathName;
		return this;
	}
	public double getPathLat() {
		return pathLat;
	}
	public RoomPath setPathLat(double pathLat) {
		this.pathLat = pathLat;
		return this;
	}
	public double getPathLng() {
		return pathLng;
	}
	public RoomPath setPathLng(double pathLng) {
		this.pathLng = pathLng;
		return this;
	}
	
		
}

