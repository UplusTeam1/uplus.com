package com.uplus.item.device.domain.payload;

import com.uplus.item.device.domain.Device;
import io.swagger.models.auth.In;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class DevicePricesResponse {

    private String code;
    private String name;
    private Integer price;
    private Integer deviceDiscount;
    private List<Integer> defaultInterestList;
    private List<Integer> discountedInterestList;
    private List<MonthlyCharge> monthlyChargeList;
    private Integer recommendedDiscountIndex;

    public static DevicePricesResponse of(
            Device device, int deviceDiscount, List<Integer> defaultInterestList,
            List<Integer> discountedInterestList, List<MonthlyCharge> monthlyChargeList, int recommendedDiscountIndex) {

        return DevicePricesResponse.builder()
                .code(device.getCode())
                .name(device.getName())
                .price(device.getPrice())
                .deviceDiscount(deviceDiscount)
                .defaultInterestList(defaultInterestList)
                .discountedInterestList(discountedInterestList)
                .monthlyChargeList(monthlyChargeList)
                .recommendedDiscountIndex(recommendedDiscountIndex)
                .build();
    }
}
