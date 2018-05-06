package com.toyota.security;

import com.toyota.dao.UserDao;
import com.toyota.domain.CustomSpringUser;
import com.toyota.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByUserName(username);

        if (user == null) {
            throw new UsernameNotFoundException(username + " is not exists.");
        }

        return new CustomSpringUser(user);
    }
}
