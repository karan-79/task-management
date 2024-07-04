package com.taskmaster.api.web.v1;

import com.taskmaster.api.web.v1.model.APILogin;
import com.taskmaster.service.AuthenticationService;
import com.taskmaster.utils.JwtUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final JwtUtils jwtUtils;

    @PostMapping("/token")
    public ResponseEntity<String> getToken(@RequestBody @Valid APILogin loginCreds, HttpServletResponse response) {
        var guid = authenticationService.getUserGuid(loginCreds);
        return ResponseEntity.ok(jwtUtils.generateToken(guid));
    }

    @GetMapping("/refresh-token")
    public String validate(HttpServletRequest request) {
        var authHeader = request.getHeader("Authorization");
        return authenticationService.validateLogin(authHeader);
    }
}
