package com.martins.code.codeblog_backend.authentication.controllers;

import com.martins.code.codeblog_backend.authentication.dto.LoginRequestDTO;
import com.martins.code.codeblog_backend.authentication.dto.RegisterRequestDTO;
import com.martins.code.codeblog_backend.authentication.dto.ResponseDTO;
import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.authentication.repositories.UserRepository;
import com.martins.code.codeblog_backend.authentication.security.TokenService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequestDTO body) {
        User user = this.userRepository.findByEmail(body.email()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        if(passwordEncoder.matches(body.password(), user.getPassword())) {
            String token = this.tokenService.createToken(user);
            return ResponseEntity.ok(new ResponseDTO(user.getId(), token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciais de login inválidas!");
    }

    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequestDTO body) {

        Optional<User> user = this.userRepository.findByEmail(body.email());
        
        if(user.isEmpty()) {

            User newUser = new User();
            newUser.setPassword(passwordEncoder.encode(body.password()));
            newUser.setEmail(body.email());
            newUser.setName(body.name());
            newUser.setUsername(body.username());
            newUser.setSkills(body.skills());
            newUser.setPhotoUrl(body.photoUrl());
            newUser.setBio(body.bio());
            newUser.setOffice(body.office());
            newUser.setLikes(body.likes());

            this.userRepository.save(newUser);

            String token = this.tokenService.createToken(newUser);

            return ResponseEntity.ok(new ResponseDTO(newUser.getId(), token));

        }
        return ResponseEntity.badRequest().body("Email já está em uso!");
    }
}