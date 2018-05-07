package com.toyota.service;

import com.toyota.SendMail.SendMail;
import com.toyota.dao.RoleDao;
import com.toyota.dao.UserDao;
import com.toyota.domain.Role;
import com.toyota.domain.User;
import com.toyota.dto.UserDto;
import com.toyota.security.GetHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private RoleDao roleDao;

    private GetHash getHash;
    private SendMail sendMail;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public List<UserDto> findAllUsers()
    {
        List<UserDto> userDtoList = new ArrayList<UserDto>();
        List<User> userList = userDao.findAll();

        for(User user : userList)
        {
            userDtoList.add(new UserDto(user));
        }
        return userDtoList;
    }
    @Transactional
    public User saveUser(UserDto userDto) throws NoSuchAlgorithmException {
            User user = new User();
            user.setUserStatus(0);//kullanıcının onay durumu sıfır olarak kaydediliyor
            user.setUserName(userDto.getUserName());
            user.setUserNickname(userDto.getUserNickname());
            user.setUserPassword(passwordEncoder.encode(userDto.getUserPassword()));
            user.setUserEmail(userDto.getUserEmail());
            if(userDto.getRoleNames() != null && !userDto.getRoleNames().isEmpty()) {
                List<Role> _roles = new ArrayList<Role>();
                for (String roleName: userDto.getRoleNames()) {
                    Role role = roleDao.findByRoleName(roleName);
                    _roles.add(role);
                }
                user.setRoles(_roles);
            } else {
                Role role = roleDao.findByRoleName("ROLE_USER");
                List<Role> roles = Arrays.asList(role);
                user.setRoles(roles);
            }
            sendMail = new SendMail();
            sendMail.WaitforConfirm(userDto.getUserEmail(),userDto.getUserName());
            userDao.persist(user);
            return user;
    }
    @Transactional
    public User updateUser(UserDto userDto)
    {
        User user = userDao.find(userDto.getId());
        if(userDto.getRoleNames() != null && !userDto.getRoleNames().isEmpty()) {
            List<Role> _roles = new ArrayList<Role>();
            for (String roleName: userDto.getRoleNames()) {
                Role role = roleDao.findByRoleName(roleName);
                _roles.add(role);
            }
            user.setRoles(_roles);
        }
        if(userDto.getUserStatus()!=0)
        {
            user.setUserStatus(userDto.getUserStatus());
        }

        userDao.merge(user);

        return user;

    }
    @Transactional
    public void removeUser(Integer id)
    {
        User user = userDao.find(id);
        userDao.remove(user);
    }


}
