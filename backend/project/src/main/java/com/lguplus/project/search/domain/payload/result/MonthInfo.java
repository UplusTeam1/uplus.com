package com.lguplus.project.search.domain.payload.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MonthInfo {
    private List<Integer> deviceCharge;
    private Integer planCharge;
    private List<Integer> totalCharge;
}