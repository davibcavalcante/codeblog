package com.martins.code.codeblog_backend.profile.controller;

import com.martins.code.codeblog_backend.authentication.model.User;
import com.martins.code.codeblog_backend.authentication.repositories.UserRepository;
import com.martins.code.codeblog_backend.exceptions.custom.InvalidIdException;
import com.martins.code.codeblog_backend.exceptions.custom.MissingParameterException;
import com.martins.code.codeblog_backend.image.service.ImageService;
import com.martins.code.codeblog_backend.profile.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profiles")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;
    @Autowired
    private ImageService imageService;
    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllProfiles() {
        return userProfileService.getProfile();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getProfileById(@PathVariable UUID id) {

        User user = userProfileService.getProfileById(id);
        if (user == null) {
            throw new InvalidIdException("User ID inválido: "+ id);
        }
        user.setEmail(null);
        user.setPassword(null);
        return user != null ? ResponseEntity.ok(user) : ResponseEntity.notFound().build();
    }

    @PostMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfileImage(@PathVariable UUID id, @RequestParam("photoUrl") MultipartFile image) throws Exception {

        if(image.isEmpty()) {
            throw new MissingParameterException("Arquivo de imagem está faltando!");
        }
        User user = userProfileService.getProfileById(id);
        if(user == null) {
            throw new InvalidIdException("User ID inválido: "+ id);
        }
        String photoUrl = imageService.uploadImageToImgur(image);
        user.setPhotoUrl(photoUrl);
        userRepository.save(user);

        return ResponseEntity.ok(photoUrl);
    }

    @PutMapping(value = "/edit/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<User> updateProfile(@PathVariable UUID id, @RequestBody User userProfile) {
        User updatedProfile = userProfileService.updateProfile(id, userProfile);
        if(updatedProfile == null) {
            throw new InvalidIdException("User ID inválido: " + id);
        }
        return updatedProfile != null ? ResponseEntity.ok(updatedProfile) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        userProfileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
