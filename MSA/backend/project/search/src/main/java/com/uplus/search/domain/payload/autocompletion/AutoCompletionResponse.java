package com.uplus.search.domain.payload.autocompletion;

import com.uplus.search.domain.payload.Source;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AutoCompletionResponse {

    private String name;

    public static AutoCompletionResponse of(Source source) {
        return AutoCompletionResponse.builder()
                .name(source.getName())
                .build();
    }

}
