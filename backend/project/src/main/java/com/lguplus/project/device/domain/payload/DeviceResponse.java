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

    public static DeviceResponse of(Device device, Discount discount) {
        return DeviceResponse.builder()
                .code(device.getCode())
                .detailPerColor(device.getDeviceDetails()
                        .stream()
                        .map(DeviceDetailResponse::of)
                        .collect(Collectors.toList()))
                .name(device.getName())
                .price(device.getPrice())
                .monthlyChargeList(calculate(device.getPrice(), discount))
                .recommendedDiscountIndex(0)
                .storage(device.getStorage())
                .weeklySale(device.getWeeklySale())
                .build();
    }

    public static List<Map<String, Object>> calculate(Integer devicePrice, Discount discount) {
        List list = new ArrayList();
        Integer planCharge = discount.getPlan().getPrice();
        // 공시지원금

        Map<String, Object> map = new HashMap<>();
        List<Integer> devices = new ArrayList<>();
        for (int i = 12; i <= 36; i += 12) {
            devices.add((devicePrice - discount.getDeviceDiscount()) / i);
        }
        List<Integer> totalCharges = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            totalCharges.add(devices.get(i) + planCharge);
        }
        map.put("deviceCharge", devices);
        map.put("planCharge", planCharge);
        map.put("totalCharge", totalCharges);

        list.add(map);

        // 12개월

        planCharge = (int) (planCharge * 0.75);

        map = new HashMap<>();
        devices = new ArrayList<>();
        for (int i = 12; i <= 36; i += 12) {
            devices.add(devicePrice / i);
        }
        totalCharges = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            totalCharges.add((int) (devices.get(i) + planCharge));
        }
        map.put("deviceCharge", devices);
        map.put("planCharge", planCharge);
        map.put("totalCharge", totalCharges);

        list.add(map);

        // 24개월 -> 12개월과 똑같음

        list.add(map);

        return list;

    }
}
