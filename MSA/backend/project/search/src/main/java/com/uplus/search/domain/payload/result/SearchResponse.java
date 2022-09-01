package com.lguplus.project.search.domain.payload.result;

import com.uplus.search.domain.payload.Source;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResponse {

    private String code;
    private String name;
    private String brand;
    private Integer price;
    private Integer weeklySale;

    public static SearchResponse of(Source source) {
        return SearchResponse.builder()
                .code(source.getCode())
                .name(source.getName())
                .brand(source.getBrand())
                .price(source.getPrice())
                .weeklySale(source.getWeeklySale())
                .build();
    }
}
