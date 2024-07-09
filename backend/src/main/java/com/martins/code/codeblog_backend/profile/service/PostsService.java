package com.martins.code.codeblog_backend.profile.service;

import com.martins.code.codeblog_backend.profile.model.Posts;
import com.martins.code.codeblog_backend.profile.repositories.PostsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PostsService {

    @Autowired
    private PostsRepository postsRepository;

    public List<Posts> getAllPosts() {
        return postsRepository.findAll();
    }

    public Posts getPostById(Long id) {
        return postsRepository.findById(id).orElse(null);
    }

    public List<Posts> getPostsByUserId(UUID userId) {
        return postsRepository.findByUserId(userId);
    }

    public Posts createPost(Posts posts) {
        return postsRepository.save(posts);
    }

    public void deletePostById(Long id) {
        postsRepository.deleteById(id);
    }

    public Posts updatePost(Long id, Posts posts) {
        Posts existingPost = postsRepository.findById(id).orElse(null);
        if (existingPost != null) {
            existingPost.setTitle(posts.getTitle());
            existingPost.setContent(posts.getContent());
            return postsRepository.save(existingPost);
        }

        return null;
    }

}
