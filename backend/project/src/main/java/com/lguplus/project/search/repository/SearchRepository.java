package com.lguplus.project.search.repository;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.lguplus.project.search.domain.payload.autocompletion.AutoCompletionResult;
import com.lguplus.project.search.domain.payload.result.SearchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Repository
@RequiredArgsConstructor
public class SearchRepository {

    @Value("${es-info.host}")
    private String HOST;

    @Value("${es-info.port}")
    private Integer PORT;

    private final RestTemplate restTemplate;

    public ResponseEntity<SearchResult> getAllSearchResults(String keyword) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        URI uri = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host(HOST)
                .port(PORT)
                .path("/device/_search")
                .queryParam("q", keyword)
                .build()
                .toUri();

        return restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, SearchResult.class);
    }

    public ResponseEntity<AutoCompletionResult> getAllAutoCompletions(String input) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<?> entity = new HttpEntity<>(headers);

        URI uri = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host(HOST)
                .port(PORT)
                .path("/device/_search")
                .queryParam("q", input)
                .build()
                .toUri();

        return restTemplate.exchange(uri.toString(), HttpMethod.GET, entity, AutoCompletionResult.class);    }
}
