package com.martins.code.codeblog_backend.authentication.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Builder
@Entity
@Table(name = "users")
@Setter @Getter
@NoArgsConstructor @AllArgsConstructor

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;
    private String email;
    private String password;
    private String username;
    private String office;
    private String photoUrl;
    private String bio;

    /*@ElementCollection
    private List<String> skills;
    @ElementCollection
    private List<String> likes;
    @ElementCollection
    private List<Post> posts;*/

    /*TODO: Criar entity Post e RepostData*/

}
