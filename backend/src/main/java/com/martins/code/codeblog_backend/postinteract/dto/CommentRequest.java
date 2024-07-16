package com.martins.code.codeblog_backend.postinteract.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter @Setter
public class CommentRequest {

    private UUID userId;
    private String content;

}
