package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.payload.ChargeInfo;
import com.lguplus.project.device.domain.payload.DeviceResponse;
import com.lguplus.project.device.domain.payload.MonthInfo;
import com.lguplus.project.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@PropertySource(value = {"classpath:price.properties"})
public class DeviceServiceBySangWoo {

    private final DiscountRepository discountRepository;

    @Value("${contract.discount.rate}")
    private Double planDiscountRate;

    @Value("${year.interest.rate}")
    private Double interest;

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
        list.add(getMonthInfo(devicePrice - deviceDiscount, planCharge, .0));
        // 12개월
        list.add(getMonthInfo(devicePrice, planCharge, planDiscountRate));
        // 24개월 -> 12개월과 똑같음
        list.add(getMonthInfo(devicePrice, planCharge, planDiscountRate));
        // 할인 없음
        list.add(getMonthInfo(devicePrice, planCharge, .0));
        return list;
    }

    private MonthInfo getMonthInfo(
            Integer devicePrice,
            Integer planCharge,
            Double planDiscountRate
    ) {
        List<Integer> deviceCharges = new ArrayList<>();
        deviceCharges.add(devicePrice);
        for (int month = 12; month <= 36; month += 12) {
            deviceCharges.add(round(getDeviceChargeWithInterest(devicePrice, month, interest)));
        }
        List<Integer> totalCharges = new ArrayList<>();
        planCharge = Double.valueOf((1 - planDiscountRate) * planCharge).intValue();
        for (Integer deviceCharge : deviceCharges) {
            totalCharges.add(round(deviceCharge + planCharge));
        }
        totalCharges.set(0, planCharge);
        return new MonthInfo(deviceCharges, planCharge, totalCharges);
    }

    private Integer getDeviceChargeWithInterest(Integer deviceCharge, Integer month, Double interest) {
        interest /= 12;
        Double variance = Math.pow(1 + interest, month);
        Integer monthlyDeviceCharge = Double.valueOf(deviceCharge * interest * variance / (variance - 1)).intValue();
        monthlyDeviceCharge -= (monthlyDeviceCharge % 10);
        return monthlyDeviceCharge;
    }

    private Integer round(Integer i) {
        return (i + 5) / 10 * 10;
    }
}
