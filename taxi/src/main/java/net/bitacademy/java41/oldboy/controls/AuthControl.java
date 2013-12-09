package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import net.bitacademy.java41.oldboy.services.AuthService;
import net.bitacademy.java41.oldboy.services.MemberService;
import net.bitacademy.java41.oldboy.vo.Frnd;
import net.bitacademy.java41.oldboy.vo.JsonResult;
import net.bitacademy.java41.oldboy.vo.LoginInfo;
import net.bitacademy.java41.oldboy.vo.Mbr;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;



@Controller
@RequestMapping("/auth")
public class AuthControl {
	@Autowired ServletContext sc;
	@Autowired AuthService authService;
	@Autowired MemberService memberService;
	
	
	// LOGIN - SELECT 
	@RequestMapping(value="/isSignUp", method=RequestMethod.POST)
	@ResponseBody
	public <T> Object isSignUp( @RequestBody String json) throws Exception {
		System.out.println("isSignUp");
		JsonResult jsonResult = new JsonResult();
		try {
			System.out.println(json);
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonObject jsonObject = (JsonObject) parser.parse(json);
			Mbr mbr = gson.fromJson(jsonObject, new TypeToken<Mbr>() {}.getType());
			
			LoginInfo loginInfo = authService.getLoginInfo(mbr.getMbrId());
			
			String mbrId = mbr.getMbrId();
//			LoginInfo loginInfo = authService.getLoginInfo(mbrId);
			
			
			if (loginInfo != null && mbrId.equals(loginInfo.getMbrId()) ) {
				jsonResult.setData(true);
				jsonResult.setStatus("success");
				
			} else {
				jsonResult.setData(false);
				jsonResult.setStatus("success");
			}
			
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	
	// SIGN UP- INSERT
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	@ResponseBody
	public <T> Object signup(@RequestBody String json, 
							HttpSession session ) throws Exception {
		JsonResult jsonResult = null;

		try {
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonObject jsonObject = (JsonObject) parser.parse(json);
			Mbr mbr = gson.fromJson(jsonObject, new TypeToken<Mbr>() {}.getType());
			
			JsonElement jsonElement = jsonObject.get("friendList");
			JsonArray jsonArray = jsonElement.getAsJsonArray();
			List<Frnd> frndList = gson.fromJson(jsonArray, new TypeToken<List<Frnd>>() {}.getType());
			
			mbr.setFrndList(frndList);
		
			memberService.signUp(mbr);
			jsonResult = new JsonResult().setStatus("success");
					
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	// LOGIN - SELECT 
	@RequestMapping(value="/login", method=RequestMethod.POST)
	@ResponseBody
	public <T> Object login( @RequestBody String json, 
										HttpSession session ) throws Exception {
		System.out.println("login");
		JsonResult jsonResult = new JsonResult();
		try {
			System.out.println(json);
			Gson gson = new Gson();
			JsonParser parser = new JsonParser();
			JsonObject jsonObject = (JsonObject) parser.parse(json);
			Mbr mbr = gson.fromJson(jsonObject, new TypeToken<Mbr>() {}.getType());
			
			JsonElement jsonElement = jsonObject.get("friendList");
			JsonArray jsonArray = jsonElement.getAsJsonArray();
			List<Frnd> frndList = gson.fromJson(jsonArray, new TypeToken<List<Frnd>>() {}.getType());
			mbr.setFrndList(frndList);
			
			LoginInfo loginInfo = authService.getLoginInfo(mbr.getMbrId());
			
			if (loginInfo != null) {
				session.setAttribute("loginInfo", loginInfo);
				jsonResult.setData(loginInfo);
				jsonResult.setStatus("success");
															
			} else {
				session.invalidate();
				jsonResult.setStatus("fail");
			}
		} catch (Throwable e) {
			e.printStackTrace();
			session.invalidate();
			
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setData(out.toString());
			jsonResult = new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
	
	// LoginInfo 세션 
	@RequestMapping(value="/loginInfo")
	@ResponseBody
	public Object loginInfo(
			HttpSession session ) throws Exception {
		
		LoginInfo loginInfo = (LoginInfo) session.getAttribute("loginInfo");
		
		JsonResult jsonResult = null;
		if (loginInfo != null) {
			jsonResult = new JsonResult().setStatus("success")
										 .setData(loginInfo);
		} else {
			session.invalidate();
			jsonResult = new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
	
	// LOGOUT 
	@RequestMapping("/logout")
	@ResponseBody
	public Object logout(HttpSession session) throws Exception {
		System.out.println("logout()");
		JsonResult jsonResult = new JsonResult();
		try {
			session.invalidate();
			jsonResult.setStatus("success");
		} catch (Throwable e) {
			e.printStackTrace();
			session.invalidate();
			
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			jsonResult.setData(out.toString());
			jsonResult = new JsonResult().setStatus("fail");
		}
		
		return jsonResult;
	}
}
