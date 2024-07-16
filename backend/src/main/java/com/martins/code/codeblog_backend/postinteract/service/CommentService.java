package com.martins.code.codeblog_backend.postinteract.service;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.authentication.repositories.UserRepository;
import com.martins.code.codeblog_backend.postinteract.model.Comment;
import com.martins.code.codeblog_backend.postinteract.repository.CommentRepository;
import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private PostsRepository postsRepository;
    @Autowired
    private UserRepository userRepository;

    public Comment addComment(Long postId, UUID userId, String content) {

        Posts post = postsRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        Comment comment = new Comment();
        comment.setPosts(post);
        comment.setUser(user);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        return commentRepository.save(comment);

    }

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostsId(postId);
    }

}
