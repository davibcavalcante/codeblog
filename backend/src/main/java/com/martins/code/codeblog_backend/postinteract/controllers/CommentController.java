package com.martins.code.codeblog_backend.postinteract.controllers;

import com.martins.code.codeblog_backend.postinteract.dto.CommentRequest;
import com.martins.code.codeblog_backend.postinteract.model.Comment;
import com.martins.code.codeblog_backend.postinteract.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/post/{postId}")
    public ResponseEntity postComment(@PathVariable Long postId, @RequestBody CommentRequest request) {

        Comment comment = commentService.addComment(postId, request.getUserId(), request.getContent());
        return new ResponseEntity<>(comment, HttpStatus.CREATED);

    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comment>> getComment(@PathVariable Long postId) {

        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);

    }

}
