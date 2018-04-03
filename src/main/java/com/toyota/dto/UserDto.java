package com.toyota.dto;

import com.toyota.domain.User;

public class UserDto {

    private Integer id;
    private String userName;
    private String userPassword;
    private String userNickname;

    public UserDto(){

    }
    public UserDto(User user)
    {
        this.id=user.getUserId();
        this.userName=user.getUserName();
        this.userNickname=user.getUserNickname();
        this.userPassword=user.getUserPassword();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserNickname() {
        return userNickname;
    }

    public void setUserNickname(String userNickname) {
        this.userNickname = userNickname;
    }
}
