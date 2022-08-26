package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.domain.DeviceDetail;
import com.lguplus.project.device.domain.payload.DeviceOptionsDetail;
import com.lguplus.project.device.domain.payload.GetDeviceOptionsResponse;
import com.lguplus.project.device.domain.payload.GetDevicePricesResponse;
import com.lguplus.project.device.domain.payload.MonthlyCharge;
import com.lguplus.project.device.repository.DeviceRepository;
import com.lguplus.project.discount.domain.Discount;
import com.lguplus.project.discount.repository.DiscountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceServiceByDongWan {

    @Autowired
    DeviceRepository deviceRepository;

    @Autowired
    DiscountRepository discountRepository;

    public GetDeviceOptionsResponse getDeviceOptions(String code) {
        Device findDevice = deviceRepository.findByCode(code);

        List<DeviceDetail> deviceDetails = findDevice.getDeviceDetails();
        List<DeviceOptionsDetail> detailPerColor = new ArrayList<>();

        for (DeviceDetail deviceDetail: deviceDetails) {
            detailPerColor.add(DeviceOptionsDetail.of(deviceDetail));
        }

        return GetDeviceOptionsResponse.of(findDevice, detailPerColor);
    }

    public GetDevicePricesResponse getDevicePrices(String code, String planName) {
        Discount discount = discountRepository.findByDeviceCodeAndPlanName(code, planName);
        Device device = discount.getDevice();
        int deviceCharge = device.getPrice();
        int planCharge = discount.getPlan().getPrice();

        List<MonthlyCharge> monthlyChargeList = new ArrayList<>();

        // 공시지원금
        int calculatedPlanCharge = planCharge;
        int calculatedDeviceCharge = deviceCharge - discount.getDeviceDiscount();
        MonthlyCharge deviceDiscount = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(deviceDiscount);
        int recommendedIndex = 0;

        // 선택 약정 12개월
        calculatedDeviceCharge = deviceCharge;
        calculatedPlanCharge = (int) Math.round(planCharge * 0.75);
        MonthlyCharge contract12Month = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(contract12Month);

        //선택 약정 24개월
        MonthlyCharge contract24Month = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(contract24Month);

        if (contract24Month.getTotalCharge().get(0) < deviceDiscount.getTotalCharge().get(0))
            recommendedIndex = 2;

        //할인 없음
        calculatedPlanCharge = planCharge;
        MonthlyCharge noDiscount = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(noDiscount);

        return GetDevicePricesResponse.of(device, monthlyChargeList, recommendedIndex);
    }
}
