package com.martins.code.codeblog_backend.exceptions.custom;

public class ImageException {

    public static class ImageSizeExceededException extends RuntimeException {
        public ImageSizeExceededException(String message) {
            super(message);
        }
    }

    public class UnsupportedImageFormatException extends RuntimeException {
        public UnsupportedImageFormatException(String message) {
            super(message);
        }
    }

}
