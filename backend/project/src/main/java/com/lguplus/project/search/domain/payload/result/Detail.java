package com.lguplus.project.search.domain.payload.result;

import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Detail {
    private String color;

    private String rgb;

    private List<String> picPaths;

    private Integer stock;

}
