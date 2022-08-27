package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.payload.DeviceResponse;
import com.lguplus.project.discount.domain.Discount;
import com.lguplus.project.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceServiceBySangWoo {

    private final DiscountRepository discountRepository;

    public List<DeviceResponse> getDevicesWithPlan(String plan) {
        return discountRepository.findByPlan_Name(plan)
                .stream()
                .map(discount -> DeviceResponse.of(
                        discount.getDevice(),
                        calculate(discount.getDevice().getPrice(), discount)))
                .collect(Collectors.toList());
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
