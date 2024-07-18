package com.martins.code.codeblog_backend.image.service;

import com.martins.code.codeblog_backend.exceptions.custom.ImageException;
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

    private final static long MAX_FILE_SIZE = 10 * 1024 * 1024;

    @Value("${imgur.client.id}")
    private String clientId;

    public String uploadImageToImgur(MultipartFile imageFile) throws IOException {

        System.out.println(imageFile.getSize());

        if(imageFile.getSize() > MAX_FILE_SIZE) {
            System.out.println("Image excede 10MB");
            throw new ImageException.ImageSizeExceededException("Tamanho da imagem excede o limite máximo de 10MB. Tamanho: " + imageFile.getSize() + " Bytes");
        }

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
