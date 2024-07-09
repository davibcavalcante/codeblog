package com.martins.code.codeblog_backend.profile.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.martins.code.codeblog_backend.profile.model.Posts;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class PostDTO {

    private Long id;
    private String title;
    private String content;
    private String imageUrl;
    private boolean repost;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm:ss")
    private LocalDateTime createdAt;

    private UUID userId;

    public static PostDTO fromEntity(Posts posts) {
        return new PostDTO(
                posts.getId(),
                posts.getTitle(),
                posts.getContent(),
                posts.getImageUrl(),
                posts.isRepost(),
                posts.getCreatedAt(),
                posts.getUser() != null ? posts.getUser().getId() : null
        );
    }

}
