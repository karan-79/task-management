package com.taskmaster.service;

import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.config.WebSecurityConfig;
import com.taskmaster.domain.UsersDAO;
import com.taskmaster.exceptions.AccessTokenInvalidException;
import com.taskmaster.exceptions.IncorrectPasswordException;
import com.taskmaster.exceptions.NoAccessException;
import com.taskmaster.exceptions.UserDoesNotExistsException;
import com.taskmaster.utils.JwtUtils;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UsersDAO usersDAO;
    private final JwtUtils jwtUtils;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;


    public UUID getUserGuid(APILogin loginCreds) {
        var account = usersDAO.getAccountByUsername(loginCreds.username());

        if (account == null) {
            throw new UserDoesNotExistsException("User doesn't exist");
        }

        if (!bCryptPasswordEncoder.matches(loginCreds.password(), account.password())) {
            throw new IncorrectPasswordException("Incorrect password");
        }

        return account.guid();
    }


    // NO OTHER WAY, this looks ugly but i couldn't make the httponly-cookies work with refresh token :(
    public String validateLogin(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new NoAccessException("Access denied");
        }
        var token = authHeader.substring(7);

        if (jwtUtils.validateToken(token)) {
            return token;
        }

        return jwtUtils.generateToken(UUID.fromString(jwtUtils.extractUserId(token)));

    }

}
