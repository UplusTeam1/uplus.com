package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.payload.ChargeInfo;
import com.lguplus.project.device.domain.payload.DeviceResponse;
import com.lguplus.project.device.domain.payload.MonthInfo;
import com.lguplus.project.device.repository.DeviceRepository;
import com.lguplus.project.discount.repository.DiscountRepository;
import com.lguplus.project.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceServiceBySangWoo {

    private final DiscountRepository discountRepository;

    @Value("${discount.rate}")
    private Double planDiscountRate;

    public List<DeviceResponse> getDevicesWithPlan(String plan) {
        return discountRepository.findByPlan_Name(plan)
                .stream()
                .map(discount -> DeviceResponse.of(
                        discount.getDevice(),
                        new ChargeInfo(calculate(
                                discount.getDevice().getPrice(),
                                discount.getDeviceDiscount(),
                                discount.getPlan().getPrice())),
                        discount.getDeviceDiscount()))
                .collect(Collectors.toList());
    }

    private List<MonthInfo> calculate(Integer devicePrice, Integer deviceDiscount, Integer planCharge) {
        List<MonthInfo> list = new ArrayList<>();
        // 공시지원금
        list.add(getMonthInfo(devicePrice, deviceDiscount, planCharge, .0));
        // 12개월
        list.add(getMonthInfo(devicePrice, 0, planCharge, planDiscountRate));
        // 24개월 -> 12개월과 똑같음
        list.add(getMonthInfo(devicePrice, 0, planCharge, planDiscountRate));
        // 할인 없음
        list.add(getMonthInfo(devicePrice, 0, planCharge, .0));
        return list;
    }

    private MonthInfo getMonthInfo(
            Integer devicePrice,
            Integer deviceDiscount,
            Integer planCharge,
            Double planDiscountRate
    ) {
        List<Integer> deviceCharges = new ArrayList<>();
        for (int i = 12; i <= 36; i += 12) {
            deviceCharges.add(round((devicePrice - deviceDiscount) / i));
        }
        List<Integer> totalCharges = new ArrayList<>();
        planCharge = Double.valueOf((1 - planDiscountRate) * planCharge).intValue();
        for (Integer deviceCharge : deviceCharges) {
            totalCharges.add(round(deviceCharge + planCharge));
        }
        return new MonthInfo(deviceCharges, planCharge, totalCharges);
    }

    private Integer round(Integer i) {
        return (i + 50) / 100 * 100;
    }
}
