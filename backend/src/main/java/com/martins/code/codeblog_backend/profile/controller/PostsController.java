package com.martins.code.codeblog_backend.profile.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.exceptions.custom.InvalidIdException;
import com.martins.code.codeblog_backend.exceptions.custom.MissingParameterException;
import com.martins.code.codeblog_backend.image.service.ImageService;
import com.martins.code.codeblog_backend.profile.dto.PostDTO;
import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.service.PostsService;
import com.martins.code.codeblog_backend.profile.service.UserProfileService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
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

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDTO>> getPostsByUserId(@PathVariable("userId") UUID userId) {
        List<Posts> userPosts = postsService.getPostsByUserId(userId);
        List<PostDTO> postDTO = userPosts.stream()
                .map(PostDTO::fromEntity)
                .collect(Collectors.toList());
        return ResponseEntity.ok(postDTO);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<PostDTO> createPost(@PathVariable("userId") UUID userId, @RequestParam("post") String postJson, @RequestPart("photoUrl") MultipartFile[] images) throws JsonProcessingException {

        if(userId == null || postJson == null || images == null) {
            throw new MissingParameterException("Parâmetros faltando: userId, post, ou photoUrl");
        }

        ObjectMapper objectMapper = new ObjectMapper();
        Posts posts = objectMapper.readValue(postJson, Posts.class);

        User user = userProfileService.getProfileById(userId);
        if (user == null) {
            throw new InvalidIdException("User ID inválido: " + userId);
        }
        posts.setUser(user);

        List<String> photoUrls = new ArrayList<>();
        for (MultipartFile image : images) {
            try {
                String photoUrl = imageService.uploadImageToImgur(image);
                photoUrls.add(photoUrl);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
            }
        }
        posts.setPhotoUrl(photoUrls);

        Posts createPost = postsService.createPost(posts);
        return createPost != null ? ResponseEntity.ok(PostDTO.fromEntity(createPost)) : ResponseEntity.notFound().build();

    }


    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> updatePost(@PathVariable("id") Long id, @Valid @RequestBody Posts posts) {
        Posts updatedPosts = postsService.updatePost(id, posts);
        return updatedPosts != null ? ResponseEntity.ok(PostDTO.fromEntity(updatedPosts)) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable("id") Long id) {
        postsService.deletePostById(id);
        return ResponseEntity.ok().build();
    }

}
