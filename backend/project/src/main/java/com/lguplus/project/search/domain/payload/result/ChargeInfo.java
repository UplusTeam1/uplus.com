package com.lguplus.project.search.domain.payload.result;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ChargeInfo {
    private List<MonthInfo> monthlyCharges;
    private Integer recommendedIndex;
    private List<Integer> defaultInterestList;
    private List<Integer> discountedInterestList;

    public ChargeInfo(List<MonthInfo> monthlyCharges) {
        this.monthlyCharges = monthlyCharges;
        this.recommendedIndex = getCheapestIndex(monthlyCharges);
        defaultInterestList = new ArrayList<>();
        discountedInterestList = new ArrayList<>();
        for (int i = 0; i < monthlyCharges.get(0).getDeviceCharge().size(); i++) {
            discountedInterestList.add(-(monthlyCharges.get(0).getDeviceCharge().get(0) - monthlyCharges.get(0).getDeviceCharge().get(i) * i * 12));
            defaultInterestList.add(-(monthlyCharges.get(3).getDeviceCharge().get(0) - monthlyCharges.get(3).getDeviceCharge().get(i) * i * 12));
        }
        discountedInterestList.set(0, 0);
        defaultInterestList.set(0, 0);
    }

    private Integer getCheapestIndex(List<MonthInfo> monthlyCharges) {
        return monthlyCharges.get(0).getTotalCharge().get(1) < monthlyCharges.get(2).getTotalCharge().get(1) ? 0 : 2;
    }
}
