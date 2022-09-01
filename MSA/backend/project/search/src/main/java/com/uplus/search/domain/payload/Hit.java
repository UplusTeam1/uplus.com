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
public class Hit {

    @JsonProperty("max_score")
    private Double maxScore;
    private List<HitInfo> hits;

}
