package com.taskmaster.config;

import com.taskmaster.utils.JwtUtils;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
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
    private static List<String> WHITE_LIST = List.of("/users/create", "/v1/auth/token" ,"/error");

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if(WHITE_LIST.stream().anyMatch(p -> request.getRequestURI().contains(p))) {
            filterChain.doFilter(request, response);
            return;
        }

        var authHeader = ((HttpServletRequest) request).getHeader("Authorization");
        if(authHeader != null && authHeader.startsWith("Bearer ")) {
            var jwt = authHeader.substring(7);
            var isValid = jwtUtils.validateToken(jwt);
            if(isValid) {

                var principal = new AuthPrincipal(UUID.fromString(jwtUtils.extractUserId(jwt)));

                var authToken = new UsernamePasswordAuthenticationToken(principal, jwt, Collections.emptyList());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authToken);

                filterChain.doFilter(request, response);
            } else {
                throw new AccessDeniedException("Access denied");
            }
        } else {
            logger.info("No Bearer token found in request");
        }

    }
}
