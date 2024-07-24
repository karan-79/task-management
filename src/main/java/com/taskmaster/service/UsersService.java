package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APIUser;
import com.taskmaster.api.web.v1.model.Person;
import com.taskmaster.domain.UsersDAO;
import com.taskmaster.domain.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Period;
import java.util.*;

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
        if(user == null) return null;
        return new APIUser(user.guid(), user.name(), user.username(), user.email(), user.role());
    }

    public Person getPerson(UUID userId) {
        var user = usersDAO.getUserById(userId);
        if(user == null) return null;
        return new Person(user.guid(), user.name(), user.email(), null);
    }

    public List<Person> getPersons(Set<UUID> userIds) {
        if(userIds.isEmpty()) return new ArrayList<>();
        return usersDAO.getUsers(userIds).stream().map(u -> new Person(u.guid(), u.name(), u.email(), null)).toList();
    }


    public List<APIUser> searchUser(String searchQuery) {
        return usersDAO.findUser(searchQuery)
                .stream()
                .filter(Objects::nonNull)
                .map(user -> new APIUser(
                        user.guid(),
                        user.name(),
                        user.username(),
                        user.email(),
                        user.role()))
                .toList();
    }
}
