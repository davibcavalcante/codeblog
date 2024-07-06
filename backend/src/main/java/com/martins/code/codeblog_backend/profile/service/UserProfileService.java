package com.martins.code.codeblog_backend.profile.service;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.authentication.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserProfileService {

    @Autowired
    private UserRepository repository;

    public List<User> getProfile() {
        return repository.findAll();
    }

    public User getProfileById(UUID id) {
        return repository.findById(id).orElse(null);
    }

    public User createProfile(User user) {
        return repository.save(user);
    }

    public User updateProfile(UUID id, User user) {

        User existingUser = repository.findById(id).orElse(null);
        if (existingUser != null) {
            existingUser.setName(user.getName());
            existingUser.setOffice(user.getOffice());
            existingUser.setPhotoUrl(user.getPhotoUrl());
            existingUser.setBio(user.getBio());

            return repository.save(existingUser);
        }

        return null;
    }

    public void deleteProfile(UUID id) {
        repository.deleteById(id);
    }

}
