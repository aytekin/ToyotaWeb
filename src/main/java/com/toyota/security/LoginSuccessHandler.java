package com.toyota.security;

import com.toyota.domain.CustomSpringUser;
import com.toyota.domain.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 *
 *  Kullanici login islemini yaptiktan sonra araya girip islem yapilabilecek servis.
 *
 * */
@Service
public class LoginSuccessHandler extends
        SavedRequestAwareAuthenticationSuccessHandler {

    private Authentication authentication;
    private CustomSpringUser cs;

    public Authentication getAuthentication() {
        return authentication;
    }

    public void setAuthentication(Authentication authentication) {
        this.authentication = authentication;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
        // record login success of user
        // LOG.info(X kullanicisi basarili sekilde login.);
        // saveToDB(X kullanicisi basarili T tarihin sekilde login.);
        this.authentication = authentication;
        Object object= this.getAuthentication().getPrincipal();

        User user = new User();
        cs = new CustomSpringUser(user);

        cs = (CustomSpringUser)object;


        System.out.println(this.getAuthentication().getDetails());

        super.onAuthenticationSuccess(request, response, authentication);
    }




}
