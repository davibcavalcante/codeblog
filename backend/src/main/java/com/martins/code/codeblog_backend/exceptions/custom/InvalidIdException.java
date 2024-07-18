package com.martins.code.codeblog_backend.exceptions.custom;

public class InvalidIdException extends RuntimeException {
    public InvalidIdException(String message) {
        super(message);
    }
}
