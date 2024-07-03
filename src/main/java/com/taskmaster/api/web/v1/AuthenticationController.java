package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.service.AuthenticationService;
import com.taskmaster.utils.JwtUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtUtils jwtUtils;

    @PostMapping("/token")
    public String getToken(@RequestBody @Valid APILogin loginCreds) {
        // get the user by username
        var guid = authenticationService.getUserGuid(loginCreds);

        // set guid in the subject in jwt
        return jwtUtils.generateToken(guid);
    }
}
