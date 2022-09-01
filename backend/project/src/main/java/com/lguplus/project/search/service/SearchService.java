package com.lguplus.project.search.service;

import com.lguplus.project.search.domain.payload.SearchResponse;
import com.lguplus.project.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public List<SearchResponse> getSearchResults(String keyword) {

        Optional.of(searchRepository.getAllSearchResults(keyword))
                .map(HttpEntity::getBody)
                .orElseThrow(RuntimeException::new)
                .forEach((key, value)->{
                    System.out.printf("%s %s%n", key, value);
                });


        return null;
    }

    private List<SearchResponse> processResults() {


        return null;
    }

}
