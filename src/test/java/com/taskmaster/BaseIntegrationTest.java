package com.taskmaster;


import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.api.web.v1.model.APIProject;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@SpringBootTest(
        webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT,
        properties = {
                "db.local=h2"
        }
)
public class BaseIntegrationTest {

    protected RestTemplate restTemplate = new RestTemplateBuilder().build();
    private static String token;
    protected static String userId; // admin in current context
    private final String baseUrl = "http://localhost:8080";

    @BeforeEach
    void setToken() {
        if(token != null) return; //need to think of another way
        var restClient = new RestTemplateBuilder().build();

        var res = restClient
                .postForObject(baseUrl + "/v1/users/create",
                        new APICreateUserRequest("admin", "admin", "admin", null), Object.class);

        userId = ((Map<String, String>) res).get("userId").toString();

        token = restClient
                .postForObject(baseUrl + "/v1/auth/token",
                        new APILogin("admin", "admin"), String.class);


    }

    protected String makeUrl(String uri) {
        return baseUrl + uri;
    }

    protected <T> ResponseEntity<T> callPost(String uri, Object payload, Class<T> clazz) {
        var headers = getAuthHeader();
        var entity = new HttpEntity<>(payload, headers);

        return restTemplate.exchange(makeUrl(uri), HttpMethod.POST, entity, clazz);
    }

    protected <T> ResponseEntity<T> callGet(String uri, Object payload, Class<T> clazz) {
        var headers = getAuthHeader();
        var entity = new HttpEntity<>(payload, headers);

        return restTemplate.exchange(makeUrl(uri), HttpMethod.GET, entity, clazz);
    }


    private HttpHeaders getAuthHeader() {
        var headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        return headers;
    }
}
