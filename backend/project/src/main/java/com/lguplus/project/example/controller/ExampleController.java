package com.lguplus.project.example.controller;

import com.lguplus.project.example.service.ExampleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/example")
public class ExampleController {

    private final ExampleService exampleService;

    @GetMapping
    ResponseEntity<?> getAllExamples() {
        return new ResponseEntity<>(exampleService.getAllExamples(), HttpStatus.OK);
    }
}
