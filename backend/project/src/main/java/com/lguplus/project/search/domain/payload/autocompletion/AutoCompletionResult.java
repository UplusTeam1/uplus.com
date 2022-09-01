package com.lguplus.project.search.domain.payload.autocompletion;

import com.lguplus.project.search.domain.payload.Hit;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AutoCompletionResult {

    private Hit hits;

}
