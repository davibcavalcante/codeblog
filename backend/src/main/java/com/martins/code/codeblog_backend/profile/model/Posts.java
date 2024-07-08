package com.martins.code.codeblog_backend.profile.model;

import jakarta.persistence.*;
import lombok.*;

@Builder
@Entity
@Table(name = "posts")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
public class Posts {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String imageUrl;
    private boolean repost;

}
