package com.lguplus.project.search.service;

import com.lguplus.project.search.domain.payload.result.SearchResponse;
import com.lguplus.project.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public List<SearchResponse> getAllSearchResults(String keyword) {

        return Optional.of(searchRepository.getAllSearchResults(keyword))
                .map(HttpEntity::getBody)
                .orElseThrow(RuntimeException::new)
                .getHits()
                .getHits()
                .stream()
                .map((hitInfo -> SearchResponse.of(hitInfo.getSource())))
                .collect(Collectors.toList());
    }

    private List<SearchResponse> processResults() {


        return null;
    }

}
