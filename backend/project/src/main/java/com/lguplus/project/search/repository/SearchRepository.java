package com.lguplus.project.search.repository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.Map;

@Repository
public class SearchRepository {

    @Value("${es-info.host}")
    private String HOST;

    @Value("${es-info.port}")
    private Integer PORT;

    public ResponseEntity<?> getSearchResult(String keyword) {
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity entity = new HttpEntity(headers);

        URI uri = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host(HOST)
                .port(PORT)
                .path("/device/_search")
                .queryParam("q", keyword)
                .build()
                .toUri();

        return restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, Map.class);

    }
}
