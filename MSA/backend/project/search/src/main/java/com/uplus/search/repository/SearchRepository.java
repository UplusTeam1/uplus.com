package com.uplus.search.repository;

import com.uplus.search.domain.payload.autocompletion.AutoCompletionResult;
import com.uplus.search.domain.payload.result.SearchResult;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

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

        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host(HOST)
                .port(PORT)
                .path("/device/_search")
                .queryParam("q", keyword)
                .queryParam("size", 100)
                .build();

        return restTemplate.exchange(uriComponents.toUriString(), HttpMethod.GET, entity, SearchResult.class);
    }

    public ResponseEntity<AutoCompletionResult> getAllAutoCompletions(String input) {
        HttpHeaders headers = new HttpHeaders();
        HttpEntity<?> entity = new HttpEntity<>(headers);

        UriComponents uriComponents = UriComponentsBuilder.newInstance()
                .scheme("http")
                .host(HOST)
                .port(PORT)
                .path("/auto-completion/_search")
                .queryParam("q", input)
                .queryParam("size", 32)
                .build();

        return restTemplate.exchange(uriComponents.toUriString(), HttpMethod.GET, entity, AutoCompletionResult.class);
    }
}
