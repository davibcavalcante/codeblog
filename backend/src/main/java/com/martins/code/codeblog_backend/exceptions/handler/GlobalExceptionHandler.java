package com.martins.code.codeblog_backend.exceptions.handler;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.martins.code.codeblog_backend.exceptions.custom.ImageException;
import com.martins.code.codeblog_backend.exceptions.custom.TokenException;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.HashMap;
import java.util.Map;
import java.time.LocalDateTime;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime dateTime = LocalDateTime.now();

    /* Exceções para credenciais de login/registro */

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationException(MethodArgumentNotValidException e, HttpServletRequest request) {
        Map<String, String> errors = e.getBindingResult().getAllErrors().stream()
                .collect(Collectors.toMap(
                        error -> ((FieldError) error).getField(),
                        error -> error.getDefaultMessage()
                ));
        return buildResponseEntity(HttpStatus.BAD_REQUEST, "Erro na validação", request.getRequestURI(), errors);
    }

    private ResponseEntity<?> buildResponseEntity(HttpStatus status, String message, String path, Map<String, String> errors) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", dateTime);
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        body.put("path", path);
        body.put("errors", errors);

        return new ResponseEntity<>(body, status);
    }

    /* Exceções para upload/retorno de imagens */

    @ExceptionHandler(ImageException.ImageSizeExceededException.class)
    public ResponseEntity<?> handleImageSizeExceededException(ImageException.ImageSizeExceededException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.PAYLOAD_TOO_LARGE, e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxUploadSizeExceededException(MaxUploadSizeExceededException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.PAYLOAD_TOO_LARGE, "Tamanho da imagem excede o limite máximo permitido de 10MB.", request.getRequestURI());
    }

    /* Exceções para token/erro de autenticação */

    @ExceptionHandler(TokenException.InvalidTokenException.class)
    public ResponseEntity<?> handleInvalidToken(TokenException.InvalidTokenException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.UNAUTHORIZED, e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(TokenException.MissingTokenException.class)
    public ResponseEntity<?> handleMissingToken(TokenException.MissingTokenException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.UNAUTHORIZED, e.getMessage(), request.getRequestURI());
    }

    private ResponseEntity<?> buildResponseEntity(HttpStatus status, String message, String path) {
        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", dateTime);
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        body.put("path", path);

        return new ResponseEntity<>(body, status);
    }

}
