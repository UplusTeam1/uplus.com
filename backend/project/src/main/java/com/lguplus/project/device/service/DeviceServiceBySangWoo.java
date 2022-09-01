package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.payload.ChargeInfo;
import com.lguplus.project.device.domain.payload.DeviceResponse;
import com.lguplus.project.device.domain.payload.MonthInfo;
import com.lguplus.project.discount.domain.Discount;
import com.lguplus.project.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
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
                        new ChargeInfo(calculate(discount.getDevice().getPrice(), discount))))
                .collect(Collectors.toList());
    }

    private List<MonthInfo> calculate(Integer devicePrice, Discount discount) {
        List<MonthInfo> list = new ArrayList<>();
        Integer planCharge = discount.getPlan().getPrice();
        // 공시지원금
        List<Integer> deviceCharges = new ArrayList<>();
        for (int i = 12; i <= 36; i += 12) {
            deviceCharges.add(round((devicePrice - discount.getDeviceDiscount()) / i));
        }
        List<Integer> totalCharges = new ArrayList<>();

        for (int i = 0; i < 3; i++) {
            totalCharges.add(round(deviceCharges.get(i) + planCharge));
        }
        MonthInfo monthInfo = new MonthInfo(deviceCharges, planCharge, totalCharges);

        list.add(monthInfo);

        // 12개월

        planCharge = (int) (planCharge * 0.75);

        deviceCharges = new ArrayList<>();
        for (int i = 12; i <= 36; i += 12) {
            deviceCharges.add(round(devicePrice / i));
        }
        totalCharges = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            totalCharges.add(round(deviceCharges.get(i) + planCharge));
        }
        monthInfo = new MonthInfo(deviceCharges, planCharge, totalCharges);
        list.add(monthInfo);
        // 24개월 -> 12개월과 똑같음
        list.add(monthInfo);
        return list;
    }

    private Integer round(Integer i) {
        return (i + 50) / 100 * 100;
    }
}
