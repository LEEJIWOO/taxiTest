package net.bitacademy.java41.oldboy.vo;

import java.io.Serializable;

public class LocationSession implements Serializable {
	private static final long serialVersionUID = 1L;

	protected String	startName;
	protected double	startX;
	protected double	startY;
	protected String	startPrefix;
	protected String	endName;
	protected double	endX;
	protected double	endY;
	protected String	endPrefix;
	
	public String getStartName() {
		return startName;
	}
	public LocationSession setStartName(String startName) {
		this.startName = startName;
		return this;
	}
	public double getStartX() {
		return startX;
	}
	public LocationSession setStartX(double startX) {
		this.startX = startX;
		return this;
	}
	public double getStartY() {
		return startY;
	}
	public LocationSession setStartY(double startY) {
		this.startY = startY;
		return this;
	}
	public String getStartPrefix() {
		return startPrefix;
	}
	public LocationSession setStartPrefix(String startPrefix) {
		this.startPrefix = startPrefix;
		return this;
	}
	public String getEndName() {
		return endName;
	}
	public LocationSession setEndName(String endName) {
		this.endName = endName;
		return this;
	}
	public double getEndX() {
		return endX;
	}
	public LocationSession setEndX(double endX) {
		this.endX = endX;
		return this;
	}
	public double getEndY() {
		return endY;
	}
	public LocationSession setEndY(double endY) {
		this.endY = endY;
		return this;
	}
	public String getEndPrefix() {
		return endPrefix;
	}
	public LocationSession setEndPrefix(String endPrefix) {
		this.endPrefix = endPrefix;
		return this;
	}
	
}
