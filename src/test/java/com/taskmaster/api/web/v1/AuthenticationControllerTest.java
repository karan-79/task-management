package com.taskmaster.api.web.v1;

import com.taskmaster.BaseIntegrationTest;
import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.domain.UsersDAO;
import com.taskmaster.service.UsersService;
import com.taskmaster.utils.JwtUtils;
import org.apache.catalina.core.ApplicationContext;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.SpyBean;

import java.util.Map;
import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

class AuthenticationControllerTest extends BaseIntegrationTest {

    @Autowired
    JwtUtils jwtUtils;

    @SpyBean
    UsersService usersService;

    @Test
    void testGenerateToken() {

        var createUser = restTemplate.postForEntity(makeUrl("/v1/users/create"),
                new APICreateUserRequest("coool", "password", "MrCool", null),
                Map.class);

        assertTrue(createUser.getStatusCode().is2xxSuccessful());

        Objects.requireNonNull(createUser.getBody());

        var login = restTemplate.postForEntity(makeUrl("/v1/auth/token"),
                new APILogin("coool", "password"),
                String.class);

        var isValidJwt = jwtUtils.validateToken(login.getBody(), ((Map<String , String>) createUser.getBody()).get("userId"));
        assertTrue(isValidJwt);
    }

    @Test
    void should_throw_when_given_isNotFound() {
        //TODO change this to payload verification when advices are done
        assertThrows(Exception.class, () -> restTemplate.postForEntity(makeUrl("/v1/auth/token"),
                new APILogin("random", "random"),
                String.class));
    }

    @Test
    void test_refreshToken() {
//        var auth =
        var token = restTemplate.getForEntity(makeUrl("/v1/auth/refresh-token"), String.class);

        assertTrue(token.getStatusCode().is2xxSuccessful());
        assertNotNull(token.getBody());
        assertTrue(jwtUtils.validateToken(token.getBody()));
    }

}