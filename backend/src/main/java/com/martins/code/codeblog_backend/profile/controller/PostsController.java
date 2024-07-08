package com.martins.code.codeblog_backend.profile.controller;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.service.PostsService;
import com.martins.code.codeblog_backend.profile.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/post")
public class PostsController {

    @Autowired
    private PostsService postsService;
    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public List<Posts> getALlPosts() {
        return postsService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Posts> getPostById(@PathVariable("id") Long id) {
        Posts posts = postsService.getPostById(id);
        return posts != null ? ResponseEntity.ok(posts) : ResponseEntity.notFound().build();
    }

    @PostMapping("/{user_id}/create")
    public ResponseEntity<Posts> createPost(@PathVariable("user_id") UUID userId, @RequestBody Posts posts) {
        User user = userProfileService.getProfileById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        posts.setUser(user);
        Posts createdPosts = postsService.createPost(posts);
        return createdPosts != null ? ResponseEntity.ok(createdPosts) : ResponseEntity.badRequest().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Posts> updatePost(@PathVariable("id") Long id, @RequestBody Posts posts) {
        Posts updatedPosts = postsService.updatePost(id, posts);
        return updatedPosts != null ? ResponseEntity.ok(updatedPosts) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Posts> deletePost(@PathVariable("id") Long id) {
        postsService.deletePostById(id);
        return ResponseEntity.ok().build();
    }

}
