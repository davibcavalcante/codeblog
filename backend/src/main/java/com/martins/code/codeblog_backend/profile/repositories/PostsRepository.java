package com.martins.code.codeblog_backend.profile.repositories;

import com.martins.code.codeblog_backend.profile.model.Posts;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostsRepository extends JpaRepository<Posts, Long> {
}
