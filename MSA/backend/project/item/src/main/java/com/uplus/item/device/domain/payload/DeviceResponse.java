package com.uplus.item.device.domain.payload;

import com.uplus.item.device.domain.Device;
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

    private List<Map<String, Object>> monthlyChargeList;

    private Integer recommendedDiscountIndex;

    private Integer storage;

    private Integer weeklySale;

    public static DeviceResponse of(Device device, List monthlyChargeList) {
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
                .build();
    }

}
