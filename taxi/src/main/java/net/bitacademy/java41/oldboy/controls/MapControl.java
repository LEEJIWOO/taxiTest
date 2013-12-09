package net.bitacademy.java41.oldboy.controls;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLDecoder;
import java.net.URLEncoder;

import javax.servlet.ServletContext;

import net.bitacademy.java41.oldboy.vo.JsonResult;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;



@Controller
@RequestMapping("/map")
public class MapControl {
	@Autowired ServletContext sc;
	
	
	@RequestMapping(value="/ollehMapApi")
	@ResponseBody
	public <T> Object ollehMapApi( String url, String params ) throws Exception {
		System.out.println("localSearch");
		
		System.out.println("url :: " + url + "\nparams :: " + params);
		HttpResponse responseGet = null;
		HttpEntity resEntity = null;
		JsonResult jsonResult = new JsonResult();
		try {
			url += "?params=" + URLEncoder.encode(params, "UTF-8");
			System.out.println("url :: " + url);
			
			HttpGet get = new HttpGet(url);
			get.setHeader("authorization", "Basic MXBmMnRvUnhPOVdCMEtMdjdYaHdTOFdKREg2SW9nNkhKQXBXVXpab0Ezd1J4UWVlT3M6QmJxR0h4Y2JnYmdaRGUxcDR1djdqYU5oMlhEbFZGWnpNOUlRZzZwckdyNTdxS3A4MHo=");
			
			responseGet = new DefaultHttpClient().execute(get);
			resEntity = responseGet.getEntity();
			String result = EntityUtils.toString(resEntity);
			result = URLDecoder.decode(result, "UTF-8").replace("\"{", "{").replace("}\"", "}");
			if (result != null && result.length() > 0) {
				jsonResult.setData(result);
				jsonResult.setStatus("success");
			} else {
				jsonResult.setStatus("fail");
			}
			
		} catch(Throwable e) {
			e.printStackTrace();
			StringWriter out = new StringWriter();
			e.printStackTrace(new PrintWriter(out));
			
			jsonResult = new JsonResult().setStatus("fail");
		}
		return jsonResult;
	}
	
	
}
