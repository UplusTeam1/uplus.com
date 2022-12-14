package com.uplus.search.domain.payload.result;

import com.uplus.search.domain.payload.Hit;
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
