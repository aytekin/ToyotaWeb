package com.toyota.domain;

import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "user")
@NamedQueries({
        @NamedQuery(name = "User.findAll", query = "SELECT c FROM User c"),
        @NamedQuery(name = "User.findByUserName", query = "select u from User u where u.userNickname = :userNickname"),
        @NamedQuery(name ="User.findBy",query ="select u from User u where u.userName = :userName" )
})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID")
    private Integer userId;
    @Column(name="USER_NAME")
    private String userName;
    @Column(name="USER_PASSWORD")
    private String userPassword;
    @Column(name="USER_NICKNAME")
    private String userNickname;
    @Column(name = "USER_EMAIL")
    private String userEmail;
    @Column(name = "USER_STATUS")
    private int userStatus;

    public int getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(int userStatus) {
        this.userStatus = userStatus;
    }

    @ManyToMany
    @LazyCollection(LazyCollectionOption.FALSE)
    @JoinTable(name = "user_role", joinColumns = {@JoinColumn(name = "USER_ID")},
            inverseJoinColumns = {@JoinColumn(name = "ROLE_ID")})


    private List<Role> roles = new ArrayList<Role>();

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
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

    public User(String userName) {
        this.userName = userName;
    }

    public User() {
    }
    public User(int userId) {
        this.userId = userId;
    }
}
