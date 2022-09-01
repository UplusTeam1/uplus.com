package com.lguplus.project.search.domain.payload.result;

import com.lguplus.project.search.domain.payload.Hit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SearchResult {

    private Hit hits;
}
