package com.toyota.service;

import com.toyota.dao.UserDao;
import com.toyota.domain.User;
import com.toyota.dto.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;

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
    public User saveUser(UserDto userDto)
    {
            User user = new User();
            user.setUserName(userDto.getUserName());
            user.setUserNickname(userDto.getUserNickname());
            user.setUserPassword(userDto.getUserPassword());

            userDao.persist(user);
            return user;
    }
    @Transactional
    public User updateUser(UserDto userDto)
    {
        User user = userDao.find(userDto.getId());
        user.setUserPassword(userDto.getUserPassword());
        user.setUserNickname(userDto.getUserNickname());
        user.setUserName(userDto.getUserName());
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
