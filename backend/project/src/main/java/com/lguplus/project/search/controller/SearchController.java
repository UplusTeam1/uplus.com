package com.lguplus.project.search.controller;

import com.lguplus.project.search.repository.SearchRepository;
import com.lguplus.project.search.service.SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("api/search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @GetMapping
    ResponseEntity<?> getSearchResults(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(searchService.getAllSearchResults(keyword), HttpStatus.OK);
    }

}
