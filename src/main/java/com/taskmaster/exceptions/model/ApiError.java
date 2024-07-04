package com.taskmaster.exceptions.model;

public record ApiError (Integer statusCode, String message){
}
