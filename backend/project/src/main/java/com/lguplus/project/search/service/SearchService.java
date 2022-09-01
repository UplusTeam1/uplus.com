package com.lguplus.project.search.service;

import com.lguplus.project.search.domain.payload.autocompletion.AutoCompletionResponse;
import com.lguplus.project.search.domain.payload.result.SearchResponse;
import com.lguplus.project.search.exception.ResultBodyNotFoundException;
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
                .orElseThrow(() -> new ResultBodyNotFoundException("검색 결과 body가 없습니다"))
                .getHits()
                .getHits()
                .stream()
                .map((hitInfo -> SearchResponse.of(hitInfo.getSource())))
                .collect(Collectors.toList());
    }

    public List<AutoCompletionResponse> getAllAutoCompletions(String input) {
        return Optional.of(searchRepository.getAllAutoCompletions(input))
                .map(HttpEntity::getBody)
                .orElseThrow(() -> new ResultBodyNotFoundException("자동 완성 결과 body가 없습니다"))
                .getHits()
                .getHits()
                .stream()
                .map((hitInfo -> AutoCompletionResponse.of(hitInfo.getSource())))
                .collect(Collectors.toList());
    }

}
