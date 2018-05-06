package com.toyota.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Clock;

/**
 *
 *  Kullanici login islemini yaptiktan sonra araya girip islem yapilabilecek servis.
 *
 * */
@Service
public class LoginSuccessHandler extends
        SavedRequestAwareAuthenticationSuccessHandler {

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
        // record login success of user
        // LOG.info(X kullanicisi basarili sekilde login.);
        // saveToDB(X kullanicisi basarili T tarihin sekilde login.);
        super.onAuthenticationSuccess(request, response, authentication);
    }

}
