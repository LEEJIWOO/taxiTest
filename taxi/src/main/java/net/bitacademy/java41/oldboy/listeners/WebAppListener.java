package net.bitacademy.java41.oldboy.listeners;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class WebAppListener implements ServletContextListener {

	@Override
	public void contextInitialized(ServletContextEvent event) {
		ServletContext sc = event.getServletContext();
		sc.setAttribute("rootPath", sc.getContextPath());
		sc.setAttribute("rootRealPath", sc.getRealPath("/"));
	}
	
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {}

}
