package com.taskmaster.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.taskmaster.exceptions.AccessTokenInvalidException;
import com.taskmaster.exceptions.NoAccessException;
import com.taskmaster.exceptions.model.ApiError;
import com.taskmaster.utils.JwtUtils;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.*;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private static List<String> WHITE_LIST = List.of("/users/create", "/v1/auth/refresh-token", "/v1/auth/token", "/error");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (WHITE_LIST.stream().anyMatch(p -> request.getRequestURI().contains(p))) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            var authHeader = ((HttpServletRequest) request).getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                var jwt = authHeader.substring(7);
                var isValid = jwtUtils.validateToken(jwt);
                if (isValid) {
                    var principal = new AuthPrincipal(UUID.fromString(jwtUtils.extractUserId(jwt)));

                    var authToken = new UsernamePasswordAuthenticationToken(principal, jwt, Collections.emptyList());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    filterChain.doFilter(request, response);
                } else {
                    logger.info("Bearer token found in request is invalid");
                    throw new AccessTokenInvalidException("Access token expired or does not exist");
                }
            } else {
                logger.info("No Bearer token found in request");
                throw new NoAccessException("Access token does not exist");
            }

        } catch (Exception e) {
            handleException(response, e);
        }
    }


    private void handleException(HttpServletResponse response, Exception e) throws IOException {
        response.setContentType("application/json");
        var writer = response.getWriter();
        var mapper = new ObjectMapper();
        if (e instanceof AccessTokenInvalidException || e instanceof JwtException) {
            response.setStatus(419);
            writer.write(mapper.writeValueAsString(new ApiError(419, e.getMessage())));
            return;
        }
        if (e instanceof NoAccessException) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            writer.write(mapper.writeValueAsString(new ApiError(HttpStatus.UNAUTHORIZED.value(), e.getMessage())));
            return;
        }
        response.setStatus(HttpStatus.INTERNAL_SERVER_ERROR.value());
        writer.write(mapper.writeValueAsString(new ApiError(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage())));
    }
}
