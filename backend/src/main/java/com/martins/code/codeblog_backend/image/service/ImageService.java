package com.martins.code.codeblog_backend.image.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class ImageService {

    @Value("${imgur.client.id}")
    private String clientId;

    public String uploadImageToImgur(MultipartFile imageFile) throws IOException {
        String imgurApiEndpoint = "https://api.imgur.com/3/image";
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Client-ID " + clientId);

        File tempFile = convert(imageFile);
        FileSystemResource fileSystemResource = new FileSystemResource(tempFile);

        MultiValueMap<String, Object> bodyMap = new LinkedMultiValueMap<>();
        bodyMap.add("image", fileSystemResource);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(bodyMap, headers);

        ResponseEntity<String> response = restTemplate.postForEntity(imgurApiEndpoint, requestEntity, String.class);
        System.out.println("Resposta do Imgur: " + response.getBody());

        Files.deleteIfExists(tempFile.toPath());

        if (response.getStatusCode() == HttpStatus.OK) {
            JSONObject json = new JSONObject(response.getBody());
            return json.getJSONObject("data").getString("link");
        }

        return null;
    }

    private File convert(MultipartFile file) throws IOException {
        File tempFile = Files.createTempFile("upload-", file.getOriginalFilename()).toFile();
        try (FileOutputStream fileOutputStream = new FileOutputStream(tempFile)) {
            fileOutputStream.write(file.getBytes());
        }
        return tempFile;
    }
}
