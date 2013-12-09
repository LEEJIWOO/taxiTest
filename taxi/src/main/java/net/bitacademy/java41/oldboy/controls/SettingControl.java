package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.SettingService;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Setting;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.support.SessionStatus;

@Controller
@RequestMapping("/settings")
public class SettingControl {
	@Autowired ServletContext sc;
	@Autowired SettingService settingService;

//	@RequestMapping(value="/addRange")
//	@ResponseBody
//	public Object addRange( HttpSession session, LoginInfo loginInfo,
//			Setting setting) throws Exception {
//
//		JsonResult jsonResult = new JsonResult();
//
//		try {
//			loginInfo = (LoginInfo) session.getAttribute("loginInfo");
//
//			// 강제적으로 default 1000m 주입
//			/* setting.setMbrId(id);*/
//			setting.setMbrId(loginInfo.getMbrId());
//			setting.setStartRange(1000);
//			setting.setEndRange(1000);
//
//
//			settingService.addRange(setting);
//			jsonResult.setStatus("success");
//			jsonResult.setData("76771111");
//			System.out.println(setting);
//
//		} catch (Throwable e) {
//			StringWriter out = new StringWriter();
//			e.printStackTrace(new PrintWriter(out));
//
//			jsonResult.setStatus("fail");
//			jsonResult.setData(out.toString());
//		}
//
//		return jsonResult;
//	}

	@RequestMapping(value="/getRange")
    @ResponseBody
    public Object getRange( HttpSession session,
                                    LoginInfo loginInfo ) throws Exception {
         
        JsonResult jsonResult = new JsonResult();
 
        try {
             
            loginInfo = (LoginInfo) session.getAttribute("loginInfo");
           
                jsonResult.setStatus("success");
                jsonResult.setData(settingService.getRange(loginInfo.getMbrId()));
                 
            } catch (Throwable e) {
            	e.printStackTrace();
                StringWriter out = new StringWriter();
                e.printStackTrace(new PrintWriter(out));
                 
                jsonResult.setStatus("fail");
                jsonResult.setData(out.toString());
            }
            return jsonResult;          
    }
	
	@RequestMapping(value="/updateRange",method=RequestMethod.POST)
	@ResponseBody
	public Object updateRange(Setting setting, HttpSession session) throws Exception{

		JsonResult jsonResult = new JsonResult();

		try{
			LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
			setting.setMbrId(loginInfo.getMbrId());
			settingService.updateRange(setting);
			jsonResult.setStatus("success");
		}catch(Throwable e){
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));

			jsonResult.setStatus("fail");
			jsonResult.setData(out.toString());
		}

		return jsonResult;

	}

//	@RequestMapping("/deleteFvrtLoc")
//	@ResponseBody
//	public Object deleteFvrtLoc(int fvrtLocNo)throws Exception{
//		JsonResult jsonResult = new JsonResult();
//		try {
//			settingService.removeFvrtLoc(fvrtLocNo);
//			jsonResult.setStatus("success");
//
//
//		} catch (Throwable e) {
//			StringWriter out = new StringWriter();
//			e.printStackTrace(new PrintWriter(out));
//
//			jsonResult.setStatus("fail");
//			jsonResult.setData(out.toString());
//		}
//		return jsonResult;
//	}

	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(SessionStatus status) throws Exception {
		System.out.println("logout()");
		status.setComplete();
		JsonResult jsonResult = new JsonResult();
		jsonResult.setStatus("success");

		return jsonResult;
	}
}













