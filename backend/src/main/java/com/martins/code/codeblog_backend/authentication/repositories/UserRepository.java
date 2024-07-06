package com.martins.code.codeblog_backend.authentication.repositories;

import com.martins.code.codeblog_backend.authentication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
}
