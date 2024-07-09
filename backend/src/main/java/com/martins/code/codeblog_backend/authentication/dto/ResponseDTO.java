package com.martins.code.codeblog_backend.authentication.dto;

import java.util.UUID;

public record ResponseDTO(UUID user_id, String token) {
}
