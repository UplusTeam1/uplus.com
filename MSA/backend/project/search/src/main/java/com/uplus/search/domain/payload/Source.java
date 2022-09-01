package com.uplus.search.domain.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Source {
    private String code;
    private String name;
    private String brand;
    private Integer price;
    @JsonProperty("weekly_sale")
    private Integer weeklySale;
}
