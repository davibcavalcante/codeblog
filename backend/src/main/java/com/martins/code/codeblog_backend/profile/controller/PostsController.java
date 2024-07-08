package com.martins.code.codeblog_backend.profile.controller;

import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.service.PostsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostsController {

    @Autowired
    private PostsService postsService;

    @GetMapping
    public List<Posts> getALlPosts() {
        return postsService.getAllPosts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Posts> getPostById(@PathVariable("id") Long id) {
        Posts posts = postsService.getPostById(id);
        return posts != null ? ResponseEntity.ok(posts) : ResponseEntity.notFound().build();
    }

    @PostMapping("/create")
    public ResponseEntity<Posts> createPost(@RequestBody Posts posts) {
        Posts createdPosts = postsService.createPost(posts);
        return createdPosts != null ? ResponseEntity.ok(createdPosts) : ResponseEntity.notFound().build();
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
