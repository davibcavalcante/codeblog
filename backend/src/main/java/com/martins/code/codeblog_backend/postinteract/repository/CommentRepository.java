package com.martins.code.codeblog_backend.postinteract.repository;

import com.martins.code.codeblog_backend.postinteract.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByPostsId(Long postId);

}
