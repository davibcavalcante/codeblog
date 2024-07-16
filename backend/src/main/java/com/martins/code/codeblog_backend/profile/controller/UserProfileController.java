package com.martins.code.codeblog_backend.profile.controller;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.profile.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    @GetMapping
    public List<User> getAllProfiles() {
        return userProfileService.getProfile();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getProfileById(@PathVariable UUID id) {
        User user = userProfileService.getProfileById(id);
        user.setEmail(null);
        user.setPassword(null);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    /*@PostMapping
    public User createProfile(@RequestBody User userProfile) {
        return userProfileService.createProfile(userProfile);
    }*/

    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable UUID id, @RequestBody User userProfile) {
        User updatedProfile = userProfileService.updateProfile(id, userProfile);
        return updatedProfile != null ? ResponseEntity.ok(updatedProfile) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        userProfileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
