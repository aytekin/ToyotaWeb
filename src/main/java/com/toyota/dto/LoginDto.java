package com.toyota.dto;

import java.util.Collection;

public class LoginDto {

    private String firstName;
    private String userName;
    private Collection userRole;
    private String email;
    private boolean loginStatus; //yanlış giriş yapıldığında hata mesajı icin

    public Collection getUserRole() {
        return userRole;
    }

    public void setUserRole(Collection userRole) {
        this.userRole = userRole;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firtName) {
        this.firstName = firtName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public boolean isLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(boolean loginStatus) {
        this.loginStatus = loginStatus;
    }
}
