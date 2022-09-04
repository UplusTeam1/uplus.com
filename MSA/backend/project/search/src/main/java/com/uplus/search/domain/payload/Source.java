package com.uplus.search.domain.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Source {
    private String code;
    private String name;
    private String brand;
    private Integer price;
    @JsonProperty("pic_paths")
    private String picPaths;
    @JsonProperty("plan_price")
    private Integer planPrice;
    @JsonProperty("plan_name")
    private String planName;
    @JsonProperty("device_discount")
    private Integer deviceDiscount;
    private Integer storage;
    private Integer stock;
    private String color;
    private String rgb;
    @JsonProperty("weekly_sale")
    private Integer weeklySale;
}
