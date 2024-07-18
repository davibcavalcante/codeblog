package com.martins.code.codeblog_backend.exceptions.custom;

public class MissingParameterException extends RuntimeException {
    public MissingParameterException(String message) {
        super(message);
    }
}
