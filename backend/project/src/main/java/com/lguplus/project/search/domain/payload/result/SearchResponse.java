package com.lguplus.project.search.domain.payload.result;

import com.lguplus.project.search.domain.payload.Source;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

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
    private List<String> picPaths;

    public static SearchResponse of(Source source) {
        return SearchResponse.builder()
                .code(source.getCode())
                .name(source.getName())
                .brand(source.getBrand())
                .price(source.getPrice())
                .weeklySale(source.getWeeklySale())
                .picPaths(csvToList(source.getPicPaths()))
                .build();
    }

    private static List<String> csvToList(String csvString) {
        StringTokenizer st = new StringTokenizer(csvString, ",");
        List<String> list = new ArrayList<>();
        while(st.hasMoreTokens()) {
            list.add(st.nextToken());
        }
        return list;
    }

}
