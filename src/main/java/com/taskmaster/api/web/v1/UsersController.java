package com.taskmaster.api.web.v1;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APIUser;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/v1/users") // not sure about it think more later
@RequiredArgsConstructor
public class UsersController {

    private final UsersService usersService;

    @PostMapping("/create")
    public Map<String, UUID> signUp(@RequestBody APICreateUserRequest userRequest) {
        return Map.of("userId", usersService.saveUser(userRequest));
    }

//    @PostMapping("/create")
//    public void signUp() {
//        try {
//            ClassLoader classLoader = UsersController.class.getClassLoader();
//            var stream = classLoader.getResourceAsStream("mockUser.json");
//            var mapper = new ObjectMapper();
//            var reqs = mapper.readValue(stream, APICreateUserRequest[].class);
//
//            Arrays.stream(reqs).forEach(usersService::saveUser);
//
//        } catch (Exception e) {
//            e.printStackTrace();
//            return;
//        }
//
//    }
    @GetMapping
    public APIUser getUser(@AuthenticationPrincipal AuthPrincipal principal){
        return usersService.getUser(principal.getUserId());
    }

    @GetMapping("/search")
    public List<APIUser> searchUser(@AuthenticationPrincipal AuthPrincipal principal,@RequestParam("q") String searchQuery ){
        return usersService.searchUser(searchQuery);
    }

}
