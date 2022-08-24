package com.lguplus.project.example.domain.payload;

import com.lguplus.project.example.domain.Example;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ExampleResponse {

    private Long id;

    public static ExampleResponse of(Example example) {
        return ExampleResponse.builder()
                .id(example.getId())
                .build();
    }
}
