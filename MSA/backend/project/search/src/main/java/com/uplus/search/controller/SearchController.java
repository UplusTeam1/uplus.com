package com.uplus.search.controller;

import com.uplus.search.service.SearchService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    @Operation(summary = "Search with Keyword")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Not Found")
    })
    @GetMapping("api/search")
    ResponseEntity<?> getSearchResults(@RequestParam("keyword") String keyword) {
        return new ResponseEntity<>(searchService.getAllSearchResults(keyword), HttpStatus.OK);
    }

    @Operation(summary = "Word Auto Completion with Text Input")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Not Found")
    })
    @GetMapping("api/auto-completion")
    ResponseEntity<?> getAutoCompletions(@RequestParam("input") String input) {
        return new ResponseEntity<>(searchService.getAllAutoCompletions(input), HttpStatus.OK);
    }

}
