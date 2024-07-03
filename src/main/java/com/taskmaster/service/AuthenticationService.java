package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.domain.UsersDAO;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsersDAO usersDAO;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public UUID getUserGuid(APILogin loginCreds) {
        var account = usersDAO.getAccountByUsername(loginCreds.username());

        if(account == null) {
            throw new RuntimeException("User doesn't exist");
        }

        if(!bCryptPasswordEncoder.matches(loginCreds.password(), account.password())) {
            throw new RuntimeException("Incorrect password");
        }

        return account.guid();
    }


}
