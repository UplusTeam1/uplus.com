package com.lguplus.project.device.domain.payload;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.domain.DeviceDetail;
import com.lguplus.project.discount.domain.Discount;
import lombok.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DeviceResponse {

    private String code;

    private List<DeviceDetailResponse> detailPerColor;

    private String name;

    private Integer price;

    private List<MonthInfo> monthlyChargeList;

    private Integer recommendedDiscountIndex;

    private Integer storage;

    private Integer weeklySale;

    private String brand;

    private Integer totalStock;

    private Integer deviceDiscount;

    private List<Integer> defaultInterestList;

    private List<Integer> discountedInterestList;

    public static DeviceResponse of(Device device, ChargeInfo chargeInfo, Integer deviceDiscount) {
        return DeviceResponse.builder()
                .code(device.getCode())
                .detailPerColor(device.getDeviceDetails()
                        .stream()
                        .map(DeviceDetailResponse::of)
                        .collect(Collectors.toList()))
                .name(device.getName())
                .price(device.getPrice())
                .monthlyChargeList(chargeInfo.getMonthlyCharges())
                .recommendedDiscountIndex(chargeInfo.getRecommendedIndex())
                .storage(device.getStorage())
                .weeklySale(device.getWeeklySale())
                .brand(device.getBrand())
                .totalStock(device.getDeviceDetails()
                        .stream()
                        .mapToInt(DeviceDetail::getStock)
                        .sum())
                .deviceDiscount(deviceDiscount)
                .defaultInterestList(chargeInfo.getDefaultInterestList())
                .discountedInterestList(chargeInfo.getDiscountedInterestList())
                .build();
    }

}
