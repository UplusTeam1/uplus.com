package com.lguplus.project.search.domain.payload.result;

import com.lguplus.project.search.domain.payload.Source;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchResponse {

    private String code;

    private String name;

    private Integer price;

    private List<Detail> detailPerColor;

    private List<MonthInfo> monthlyChargeList;

    private Integer recommendedDiscountIndex;

    private String brand;

    private Integer storage;

    private Integer weeklySale;

    private Integer totalStock;

    private Integer deviceDiscount;

    private Integer planCharge;

    private List<Integer> defaultInterestList;

    private List<Integer> discountedInterestList;

    private Double score;

    public void setValues(ChargeInfo chargeInfo) {
        setMonthlyChargeList(chargeInfo.getMonthlyCharges());
        setRecommendedDiscountIndex(chargeInfo.getRecommendedIndex());
        setDefaultInterestList(chargeInfo.getDefaultInterestList());
        setDiscountedInterestList(chargeInfo.getDiscountedInterestList());
    }

}
