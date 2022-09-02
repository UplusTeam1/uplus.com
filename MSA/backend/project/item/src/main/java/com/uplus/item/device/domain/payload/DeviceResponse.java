package com.uplus.item.device.domain.payload;

import com.uplus.item.device.domain.Device;
import com.uplus.item.device.domain.DeviceDetail;
import com.uplus.item.discount.domain.Discount;
import lombok.*;

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

    public static DeviceResponse of(Discount discount, Device device, ChargeInfo chargeInfo) {
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
                .deviceDiscount(discount.getDeviceDiscount())
                .build();
    }

}
