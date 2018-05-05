package com.toyota.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.List;

public class CustomSpringUser extends User {

    private final com.toyota.domain.User user;

    public CustomSpringUser(com.toyota.domain.User user) {
        super(user.getUserName(), user.getUserPassword(), true, true, true, true, getGrantedAuthorities(user.getRoles()));
        this.user = user;
    }

    public static List<GrantedAuthority> getGrantedAuthorities(List<Role> roles) {
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (Role role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        }
        return authorities;
    }

    public com.toyota.domain.User getUser() {
        return user;
    }
}
