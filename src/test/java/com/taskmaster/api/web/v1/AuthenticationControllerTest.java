package com.taskmaster.api.web.v1;

import com.taskmaster.BaseIntegrationTest;
import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.utils.JwtUtils;
import org.apache.catalina.core.ApplicationContext;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class AuthenticationControllerTest extends BaseIntegrationTest {

    @Autowired
    JwtUtils jwtUtils;


    @Test
    void testGenerateToken() {

        var createUser = restTemplate.postForEntity(makeUrl("/v1/users/create"),
                new APICreateUserRequest("coool", "password", "MrCool", null),
                UUID.class);

        assertTrue(createUser.getStatusCode().is2xxSuccessful());

        Objects.requireNonNull(createUser.getBody());

        var login = restTemplate.postForEntity(makeUrl("/v1/auth/token"),
                new APILogin("coool", "password"),
                String.class);

        var isValidJwt = jwtUtils.validateToken(login.getBody(), createUser.getBody().toString());
        assertTrue(isValidJwt);
    }

}