package com.lguplus.project.search.service;

import com.lguplus.project.search.domain.payload.SearchResponse;
import com.lguplus.project.search.repository.SearchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchService {

    private final SearchRepository searchRepository;

    public List<SearchResponse> getSearchResults(String keyword) {



        return null;
    }

    private List<SearchResponse> processResults() {


        return null;
    }

}
