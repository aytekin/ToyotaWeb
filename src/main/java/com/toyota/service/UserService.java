package com.toyota.service;

import com.toyota.dao.UserDao;
import com.toyota.domain.User;
import com.toyota.dto.UserDto;
import com.toyota.security.GetHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    private GetHash getHash ;

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
            user.setUserName(userDto.getUserName());
            user.setUserNickname(userDto.getUserNickname());
            getHash= new GetHash();
            user.setUserPassword(getHash.HashToPassword(userDto.getUserPassword()));
           // user.setUserPassword(userDto.getUserPassword());
            user.setUserEmail(userDto.getUserEmail());

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
        user.setUserEmail(userDto.getUserEmail());
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
