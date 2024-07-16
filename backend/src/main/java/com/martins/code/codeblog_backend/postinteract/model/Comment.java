package com.martins.code.codeblog_backend.postinteract.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.profile.model.Posts;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter @Setter
@AllArgsConstructor @NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Posts posts;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonBackReference
    private User user;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

}
