package com.martins.code.codeblog_backend.authentication.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO (
        @NotBlank(message = "Campo Email é obrigatório!")
        @Email(message = "Email inválido!")
        String email,

        @NotBlank(message = "Campo senha é obrigatório!")
        String password
) {}
