package com.taskmaster.api.web.v1.advices;

import com.taskmaster.exceptions.AccessTokenInvalidException;
import com.taskmaster.exceptions.NoAccessException;
import com.taskmaster.exceptions.model.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//TODO Can rethink on name
@RestControllerAdvice
public class APIAdvices {


    @ExceptionHandler(NoAccessException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError handleNoAccess(NoAccessException e) {
        return new ApiError(HttpStatus.UNAUTHORIZED.value(), e.getMessage());
    }

    @ExceptionHandler(AccessTokenInvalidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ApiError handleAccessTokenExpiration(AccessTokenInvalidException e) {
        return new ApiError(419, e.getMessage());
    }

}
