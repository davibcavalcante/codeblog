package com.martins.code.codeblog_backend.authentication.dto;

import jakarta.validation.constraints.*;

import java.util.List;

public record RegisterRequestDTO (
        @NotBlank(message = "Campo nome é obrigatório!")
        String name,

        @NotBlank(message = "O nome de usuário é obrigatório.")
        @Size(min = 5, max = 20, message = "O nome de usuário deve ter entre 5 e 20 caracteres.")
        @Pattern(regexp = "\\S+", message = "O nome de usuário não pode conter espaços em branco.")
        String username,

        @NotBlank(message = "Campo email é obrigatório!")
        @Email(message = "Email inválido!")
        String email,

        @NotBlank(message = "Campo senha é obrigatório!")
        @Size(min = 8, message = "Senha deve ter pelo menos 8 caracteres.")
        @Pattern(regexp = ".*\\d.*", message = "Senha deve conter pelo menos um número.")
        String password,

        @Size(min = 10, max = 150, message = "A bio deve ter entre 10 e 150 caracteres")
        String bio,

        String photoUrl,
        String office,
        List<String> skills,
        List<String> likes
) {}
