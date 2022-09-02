package com.uplus.item.device.domain.payload;

import lombok.Getter;

import java.util.List;

@Getter
public class ChargeInfo {
    private List<MonthInfo> monthlyCharges;
    private Integer recommendedIndex;

    public ChargeInfo(List<MonthInfo> monthlyCharges) {
        this.monthlyCharges = monthlyCharges;
        this.recommendedIndex = getCheapestIndex(monthlyCharges);
    }

    private Integer getCheapestIndex(List<MonthInfo> monthlyCharges) {
        return monthlyCharges.get(0).getTotalCharge().get(0) < monthlyCharges.get(2).getTotalCharge().get(0) ? 0 : 2;
    }
}
