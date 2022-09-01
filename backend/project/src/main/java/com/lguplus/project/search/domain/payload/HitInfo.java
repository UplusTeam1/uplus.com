package com.lguplus.project.search.domain.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class HitInfo {

    @JsonProperty("_score")
    private Double score;
    @JsonProperty("_source")
    private Source source;
}
