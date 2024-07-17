package com.martins.code.codeblog_backend.profile.controller;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.image.service.ImageService;
import com.martins.code.codeblog_backend.profile.dto.PostDTO;
import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.service.PostsService;
import com.martins.code.codeblog_backend.profile.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/post")
public class PostsController {

    @Autowired
    private PostsService postsService;
    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ImageService imageService;

    @GetMapping
    public List<PostDTO> getALlPosts() {
        return postsService.getAllPosts().stream()
                .map(PostDTO::fromEntity)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> getPostById(@PathVariable("id") Long id) {
        Posts posts = postsService.getPostById(id);
        return posts != null ? ResponseEntity.ok(PostDTO.fromEntity(posts)) : ResponseEntity.notFound().build();
    }

    @GetMapping("/{userId}/posts")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable("userId") UUID userId) {
        List<Posts> userPosts = postsService.getPostsByUserId(userId);
        List<PostDTO> postDTO = userPosts.stream()
                .map(PostDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDTO);
    }

    @PostMapping("/{userId}/create")
    public ResponseEntity<PostDTO> createPost(@PathVariable("userId") UUID userId, @RequestBody Posts posts) {
        User user = userProfileService.getProfileById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        posts.setUser(user);
        Posts createPost = postsService.createPost(posts);
        return createPost != null ? ResponseEntity.ok(PostDTO.fromEntity(createPost)) : ResponseEntity.notFound().build();
    }

    /*@PostMapping("/{id}/image")
    public ResponseEntity<PostDTO> uploadImage(@PathVariable("id") UUID id, @RequestParam("image") MultipartFile image) throws Exception {
        User user = userProfileService.getProfileById(id);
        return imageService.upload(image)
                .flatMap(imageUrl -> {
                    postsService.updatePost()
                })
    }*/

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable("id") Long id, @RequestBody Posts posts) {
        Posts updatedPosts = postsService.updatePost(id, posts);
        return updatedPosts != null ? ResponseEntity.ok(PostDTO.fromEntity(updatedPosts)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
        postsService.deletePostById(id);
        return ResponseEntity.ok().build();
    }

}
