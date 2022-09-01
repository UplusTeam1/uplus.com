package com.lguplus.project.device.domain.payload;

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
    private List<Integer> deviceCharges;
    private Integer planCharge;
    private List<Integer> totalCharges;
}
