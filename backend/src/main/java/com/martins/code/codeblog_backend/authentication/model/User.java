package com.martins.code.codeblog_backend.authentication.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.martins.code.codeblog_backend.profile.model.Posts;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Builder
@Entity
@Table(name = "users")
@Setter @Getter
@NoArgsConstructor @AllArgsConstructor
@JsonIgnoreProperties({"posts"})

public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String name;

    @JsonIgnore
    private String email;
    @JsonIgnore
    private String password;

    private String username;
    private String office;
    private String photoUrl;
    private String bio;

    @ElementCollection
    private List<String> skills;
    @ElementCollection
    private List<String> likes;

    @OneToMany(mappedBy = "user")
    private List<Posts> posts;

}
