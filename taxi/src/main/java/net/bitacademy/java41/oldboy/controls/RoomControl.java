package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.RoomService;
import net.bitacademy.java41.oldboy.vo.FvrtLoc;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LocationSession;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Room;
import net.bitacademy.java41.oldboy.vo.RoomMbr;
import net.bitacademy.java41.oldboy.vo.RoomPath;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/room")
public class RoomControl {
	@Autowired ServletContext sc;
	@Autowired RoomService roomService;

	@RequestMapping(value="/setLocationSession")
	@ResponseBody
	public Object setLocationSession(
			LocationSession paramLocation,
			HttpSession session ) throws Exception {
		JsonResult jsonResult = null;
		LocationSession locationSession = (LocationSession) session.getAttribute("locationSession");

		if ( locationSession == null ) {
			locationSession = paramLocation;
		} else {
			if ( paramLocation.getStartName() != null && !"".equals(paramLocation.getStartName()) ) {
				locationSession.setStartName(paramLocation.getStartName());
			}
			if ( paramLocation.getStartX() != 0 ) {
				locationSession.setStartX(paramLocation.getStartX());
			}
			if ( paramLocation.getStartY() != 0 ) {
				locationSession.setStartY(paramLocation.getStartY());
			}
			if ( paramLocation.getStartPrefix() != null ) {
				locationSession.setStartPrefix(paramLocation.getStartPrefix());
			}
			if ( paramLocation.getEndName() != null && !"".equals(paramLocation.getEndName()) ) {
				locationSession.setEndName(paramLocation.getEndName());
			}
			if ( paramLocation.getEndX() != 0 ) {
				locationSession.setEndX(paramLocation.getEndX());
			}
			if ( paramLocation.getEndY() != 0 ) {
				locationSession.setEndY(paramLocation.getEndY());
			}
			if ( paramLocation.getEndPrefix() != null ) {
				locationSession.setEndPrefix(paramLocation.getEndPrefix());
			}
		}

		session.setAttribute("locationSession", locationSession);


		if (locationSession != null) {
			jsonResult = new JsonResult()
										.setStatus("success")
										.setData(locationSession);
		} else {
			jsonResult = new JsonResult()
										.setStatus("fail")
										.setData(null);
		}

		return jsonResult;
	}


	@RequestMapping(value="/getLocationSession")
	@ResponseBody
	public Object getLocationSession( HttpSession session) throws Exception {
		JsonResult jsonResult = null;

		LocationSession locationSession = (LocationSession) session.getAttribute("locationSession");

		if (locationSession != null) {
			jsonResult = new JsonResult().setStatus("success")
										 .setData(locationSession);
		} else {
			jsonResult = new JsonResult().setStatus("fail");
		}

		return jsonResult;
	}


	@RequestMapping("/searchRooms")
	@ResponseBody
	public JsonResult searchRooms(String startTime,
			String startLat, String startLng, int startRange,
			String endLat, String endLng, int endRange,
			HttpSession session ) throws Exception {
		JsonResult jsonResult = new JsonResult();
		try {
//			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			System.out.println("start: " + startLat + ", " + startLng + " | " + startRange
					+ "\nend : " + endLat + ", " + endLng + " | " + endRange);
//			Date startTimeDate = new Date( Long.parseLong(startTime) );
//			System.out.println(sdf.format(startTimeDate));

			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			jsonResult.setData( roomService.searchRooms( loginInfo.getMbrId(),
																			Double.parseDouble(startLat),
																			Double.parseDouble(startLng),
																			startRange,
																			Double.parseDouble(endLat),
																			Double.parseDouble(endLng),
																			endRange ) );
			jsonResult.setStatus("success");

		} catch (Throwable e) {
			e.printStackTrace();
			StringWriter out =  new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;
	}


    @RequestMapping("/isRoomMbr")
    @ResponseBody
    public JsonResult isRoomMbr(HttpSession session) throws Exception {

    	JsonResult jsonResult = new JsonResult();
    	try {
	    	LoginInfo loginInfo = (LoginInfo)session.getAttribute("loginInfo");

	    	boolean result = roomService.isRoomMbr(loginInfo.getMbrId());
    		jsonResult.setStatus("success");
    		jsonResult.setData(result);

    	} catch (Throwable e) {
    		e.printStackTrace();
    		StringWriter out = new StringWriter();
    		e.printStackTrace(new PrintWriter(out));

    		jsonResult.setStatus("fail");
    		jsonResult.setData(out.toString());
    	}
    	return jsonResult;
    }


    @RequestMapping("/addRoom")
    @ResponseBody
    public JsonResult addRoom(
    		Room room,
    		String startLocName, double startLocLat, double startLocLng, int startLocRank,
    		String endLocName, double endLocLat, double endLocLng, int endLocRank,
    		HttpSession session ) throws Exception {
        JsonResult jsonResult= new JsonResult();
        try {

        	LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			RoomMbr roomMbr = new RoomMbr()
											.setMbrId( loginInfo.getMbrId() )
											.setRoomMbrRank(0);
        	RoomPath startPath = new RoomPath()
											.setPathRank(startLocRank)
											.setPathName(startLocName)
											.setPathLat(startLocLat)
											.setPathLng(startLocLng);
        	RoomPath endPath = new RoomPath()
											.setPathRank(endLocRank)
											.setPathName(endLocName)
											.setPathLat(endLocLat)
											.setPathLng(endLocLng);

        	FvrtLoc recentEndLoc = new FvrtLoc()
												.setMbrId( loginInfo.getMbrId() )
												.setFvrtLocName( endPath.getPathName() )
												.setFvrtLocLat( endPath.getPathLat() )
												.setFvrtLocLng( endPath.getPathLng() )
												.setFvrtLocStatus( "R" );

			int roomNo = roomService.addRoom( room, startPath, endPath, roomMbr, recentEndLoc );

			jsonResult.setData(roomNo);
			jsonResult.setStatus("success");

        } catch (Throwable e) {
            e.printStackTrace();
            StringWriter out =  new StringWriter();
            e.printStackTrace(new PrintWriter(out));

            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }

        return jsonResult;
    }


    @RequestMapping("/joinRoom")
    @ResponseBody
    public JsonResult joinRoom(
    		RoomMbr roomMbr,
    		String endLocName,
    		double endLocLat,
    		double endLocLng,
    		HttpSession session ) throws Exception {
        JsonResult jsonResult = new JsonResult();
        try {
        	LoginInfo loginInfo = (LoginInfo)session.getAttribute("loginInfo");
        	roomMbr.setMbrId( loginInfo.getMbrId() );

        	FvrtLoc recentEndLoc = new FvrtLoc()
	        									.setMbrId( loginInfo.getMbrId() )
	        									.setFvrtLocName( endLocName )
	        									.setFvrtLocLat( endLocLat )
	        									.setFvrtLocLng( endLocLng )
	        									.setFvrtLocStatus( "R" );
            roomService.joinRoom(roomMbr, recentEndLoc);
            jsonResult.setStatus("success");

        } catch (Throwable e) {
            e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));

            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }
        return jsonResult;
    }


    @RequestMapping("/getRoomInfo")
    @ResponseBody
    public Object getRoomInfo( int roomNo ) throws Exception {
        JsonResult jsonResult = new JsonResult();

        try {
            jsonResult.setStatus("success");
            jsonResult.setData( roomService.getRoomInfo(roomNo) );

        } catch (Throwable e) {
        	e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));

            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }

        return jsonResult;
    }


    @RequestMapping("/getMyRoom")
    @ResponseBody
    public Object getMyRoom( HttpSession session ) throws Exception {
        JsonResult jsonResult = new JsonResult();
        try {
        	LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");

        	Room myRoom = roomService.getMyRoom( loginInfo.getMbrId() );

        	if ( myRoom != null ) {
        		jsonResult.setStatus("success");
                jsonResult.setData( myRoom );
        	} else {
        		jsonResult.setStatus("fail");
        	}

        } catch (Throwable e) {
        	e.printStackTrace();
            StringWriter out = new StringWriter();
            e.printStackTrace(new PrintWriter(out));

            jsonResult.setStatus("fail");
            jsonResult.setData(out.toString());
        }

        return jsonResult;
    }

  @RequestMapping("/outRoom")
  @ResponseBody
  public Object outRoom( String mbrId, int roomNo ) throws Exception {
      JsonResult jsonResult = new JsonResult();

      System.out.println(mbrId + roomNo);
      try {
          roomService.outRoom(mbrId, roomNo);
          jsonResult.setStatus("success");

      } catch (Throwable e) {
          e.printStackTrace();
          StringWriter out = new StringWriter();
          e.printStackTrace(new PrintWriter(out));

          jsonResult.setStatus("fail");
          jsonResult.setData(out.toString());
      }
      return jsonResult;
  }



}













