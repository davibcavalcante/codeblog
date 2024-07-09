package com.martins.code.codeblog_backend.authentication.dto;

import java.util.List;

public record RegisterRequestDTO (String name, String username, String email, String password, String bio, String photoUrl, String office, List<String> skills, List<String> likes) {
}
