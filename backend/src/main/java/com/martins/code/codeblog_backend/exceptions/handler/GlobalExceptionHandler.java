package com.martins.code.codeblog_backend.exceptions.handler;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.martins.code.codeblog_backend.exceptions.custom.ImageException;
import com.martins.code.codeblog_backend.exceptions.custom.InvalidIdException;
import com.martins.code.codeblog_backend.exceptions.custom.MissingParameterException;
import com.martins.code.codeblog_backend.exceptions.custom.TokenException;
import jakarta.servlet.http.HttpServletRequest;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

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

    /* Exceções para ID inválido */

    @ExceptionHandler(InvalidIdException.class)
    public ResponseEntity<?> handleInvalidId(InvalidIdException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    /* Exceções para parâmetro faltando e content-type inválido */

    @ExceptionHandler(MissingParameterException.class)
    public ResponseEntity<?> handleMissingParameter(MissingParameterException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.BAD_REQUEST, e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<?> handleMissingPart(MissingServletRequestPartException e, HttpServletRequest request) {
        return buildResponseEntity(HttpStatus.BAD_REQUEST, "Parte obrigatória da requisição está faltando: " + e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<String> handleHttpMediaTypeNotSupportedException(HttpMediaTypeNotSupportedException e) {
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("Content-Type não suportado: " + e.getContentType());
    }

    @ExceptionHandler(FileUploadException.class)
    public ResponseEntity<String> handleFileUploadException(FileUploadException e) {
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).body("Content-Type não suportado: " + e.getMessage() + "\nConfirme o Content-Type necessário para esta requisição.");
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
