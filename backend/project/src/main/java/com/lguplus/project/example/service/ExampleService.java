package com.lguplus.project.example.service;

import com.lguplus.project.example.domain.payload.ExampleResponse;
import com.lguplus.project.example.exception.ExampleNotFoundException;
import com.lguplus.project.example.repository.ExampleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ExampleService {

    private final ExampleRepository exampleRepository;

    public List<ExampleResponse> getAllExamples() {
        return exampleRepository.findAll()
                .stream()
                .map(ExampleResponse::of)
                .collect(Collectors.toList());
    }

    public ExampleResponse getExample(Long id) {
        return Optional.of(id)
                .flatMap(exampleRepository::findById)
                .map(ExampleResponse::of)
                .orElseThrow(ExampleNotFoundException::new);
    }
}
