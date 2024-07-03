package com.taskmaster.config;

import com.taskmaster.utils.JwtUtils;
import io.jsonwebtoken.lang.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig {

    @Autowired JwtUtils jwtUtils;

    private static List<String> ALLOWED_METHODS = List.of(
            "GET",
            "POST",
            "DELETE",
            "PATCH",
            "PUT",
            "OPTIONS"
    );

    private static List<String> ALLOWED_ORIGINS = List.of(
            "http://localhost:5173"
    );

    @Bean
    @Order(-1)
    CorsConfigurationSource corsConfigurationSource() {
       CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(ALLOWED_ORIGINS);
        configuration.setAllowedMethods(ALLOWED_METHODS);
        configuration.addAllowedHeader("Content-Type");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        CorsConfiguration configWithoutCredentials = new CorsConfiguration();
        configWithoutCredentials.setAllowedOrigins(ALLOWED_ORIGINS);
        configWithoutCredentials.setAllowedMethods(ALLOWED_METHODS);
        configWithoutCredentials.addAllowedHeader("Content-Type");
        configWithoutCredentials.setAllowCredentials(false);
        source.registerCorsConfiguration("/users/create", configWithoutCredentials);
        source.registerCorsConfiguration("/auth/token", configWithoutCredentials);

        return source;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .addFilterBefore(new JwtFilter(jwtUtils), UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("*/users/create", "/v1/auth/token", "/error")
                        .permitAll()
                        .anyRequest().authenticated())
                .anonymous(AbstractHttpConfigurer::disable)
                .cors(c -> c.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(AbstractHttpConfigurer::disable)
                .formLogin(AbstractHttpConfigurer::disable)
                .sessionManagement(h->h.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .build();
    }

}
