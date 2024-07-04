package com.taskmaster.exceptions;

public class AccessTokenInvalidException extends RuntimeException{
    public AccessTokenInvalidException(String message) {
        super(message);
    }
}
