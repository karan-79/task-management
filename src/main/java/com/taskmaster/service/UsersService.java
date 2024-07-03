package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APIUser;
import com.taskmaster.domain.UsersDAO;
import com.taskmaster.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final UsersDAO usersDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UUID saveUser(APICreateUserRequest userRequest) {
        var guid = UUID.randomUUID();
        var user = new User(
                null,
                guid,
                userRequest.username(),
                bCryptPasswordEncoder.encode(userRequest.password()),
                userRequest.name(),
                userRequest.email(),
                null,
                null
        );

        usersDAO.createUser(user);
        return guid;
    }

    public APIUser getUser(UUID userId) {
        var user = usersDAO.getUserById(userId);
        return new APIUser(user.guid(), user.name(), user.username(), user.role());
    }



}
