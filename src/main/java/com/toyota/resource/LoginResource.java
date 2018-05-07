package com.toyota.resource;

import com.toyota.dao.UserDao;
import com.toyota.domain.CustomSpringUser;
import com.toyota.domain.User;
import com.toyota.dto.LoginDto;
import com.toyota.security.LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;

@Component
@Path("/login")
public class LoginResource {

    @Autowired
    private LoginSuccessHandler service;


    @GET
    @Produces("application/json")
    public LoginDto loginControl() {
        LoginDto loginDto = new LoginDto();
        service = new LoginSuccessHandler();
        com.toyota.domain.User user;
        com.toyota.dao.UserDao userDao;
        //authentication islemi gerceklestiyse giris yapan kisinin bilgilerini user nesnesine atıyoruz
        //user = (User) service.getAuthentication().getPrincipal();
        //logindto'nun nick namesi giris yapan kisinin bilgilerine aktarılıyor
        String username;
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else {//Eğer oturum yoksa kullanıcı adı "anonymousUser" döner.
            username = principal.toString();
        }
        //Eğer kullanıcı adı varsayılan değerse null atanır.
        if (username == "anonymousUser")
            username = null;

        loginDto.setFirstName(username);
        userDao = new UserDao();
        if (loginDto.getFirstName() != null) {
            User users ;
            users= userDao.findByUserNamee(loginDto.getFirstName());
            loginDto.setUserName(users.getUserNickname());
            loginDto.setEmail(users.getUserEmail());
            loginDto.setUserRole(users.getRoles());
        }
        if (loginDto.getFirstName() != null)//Kullanıcı giriş yaptıysa.
            loginDto.setLoginStatus(true);
        else
            loginDto.setLoginStatus(false);//Kullanıcı giriş yapmadıysa login durumunu false yapıyoruz.
        return loginDto;
    }
}