package cn.com.service;
import java.io.IOException;

import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.ServletActionContext;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import cn.com.bean.User;

import com.opensymphony.xwork2.ModelDriven;
@Repository(value="userRegedit")
@Scope("prototype")
public class UserRegedit implements ModelDriven<User>{
	@Autowired
	private SessionFactory sf;
	@Autowired
	private User user;
	@Transactional
	public String regedit_user(){
//		普通用户注册   
		Session session=sf.getCurrentSession();
		session.save(user);
		return "success"; 
	}
	@Transactional
	public String login_user(){
//		普通用户登录
		Session session=sf.getCurrentSession();
		String sql="from User where username=? and password=?";
		Query query=session.createQuery(sql);
		query.setString(0, user.getUsername());
		query.setString(1, user.getPassword());
		 User u=(User)query.uniqueResult();
		 String toast="";
		 if(u!=null){
			 toast="success"; 
		 }else{
			 toast="fail"; 
		 }
		 HttpServletResponse response = ServletActionContext.getResponse();
			response.setCharacterEncoding("utf-8");
			try {
				response.getWriter().write(toast);
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		return null;
	}
	//忘记密码
	@Transactional
	public String forget(){
		Session  session=sf.getCurrentSession();
		String sql="update User set password=?  where username=?";
		Query query=session.createQuery(sql);
		query.setString(0,user.getPassword());
		query.setString(1,user.getUsername());
		query.executeUpdate();
		return "success";
	}
	
	public User getModel() {
  
		return user;
	}

}
