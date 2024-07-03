package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APICreateUserRequest;
import com.taskmaster.api.web.v1.model.APIUser;
import com.taskmaster.config.AuthPrincipal;
import com.taskmaster.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping
    public APIUser getUser(@AuthenticationPrincipal AuthPrincipal principal){
        return usersService.getUser(principal.getUserId());
    }

}
