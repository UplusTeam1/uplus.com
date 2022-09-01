package com.lguplus.project.device.domain.payload;

import com.lguplus.project.device.domain.Device;
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

    private List<Map<String, Object>> monthlyChargeList;

    private Integer recommendedDiscountIndex;

    private Integer storage;

    private Integer weeklySale;

    private String brand;

    public static DeviceResponse of(Device device, List<Map<String, Object>> monthlyChargeList) {
        return DeviceResponse.builder()
                .code(device.getCode())
                .detailPerColor(device.getDeviceDetails()
                        .stream()
                        .map(DeviceDetailResponse::of)
                        .collect(Collectors.toList()))
                .name(device.getName())
                .price(device.getPrice())
                .monthlyChargeList(monthlyChargeList)
                .recommendedDiscountIndex(0)
                .storage(device.getStorage())
                .weeklySale(device.getWeeklySale())
                .brand(device.getBrand())
                .build();
    }

}
