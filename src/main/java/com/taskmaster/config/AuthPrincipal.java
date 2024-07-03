package com.taskmaster.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.UUID;

@Getter
@AllArgsConstructor
public class AuthPrincipal {
    UUID userId;
}
