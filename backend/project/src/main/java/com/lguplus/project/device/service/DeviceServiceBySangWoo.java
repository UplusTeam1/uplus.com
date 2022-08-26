package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.payload.DeviceResponse;
import com.lguplus.project.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DeviceServiceBySangWoo {

    private final DiscountRepository discountRepository;

    public List<DeviceResponse> getDevicesWithPlan(String plan) {
        return discountRepository.findByPlan_Name(plan)
                .stream()
                .map(discount -> DeviceResponse.of(discount.getDevice(), discount))
                .collect(Collectors.toList());
    }

}
