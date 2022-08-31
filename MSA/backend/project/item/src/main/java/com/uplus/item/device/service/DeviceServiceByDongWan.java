package com.uplus.item.device.service;

import com.uplus.item.device.domain.Device;
import com.uplus.item.device.domain.DeviceDetail;
import com.uplus.item.device.domain.payload.DeviceOptionsDetail;
import com.uplus.item.device.domain.payload.GetDeviceOptionsResponse;
import com.uplus.item.device.domain.payload.GetDevicePricesResponse;
import com.uplus.item.device.domain.payload.MonthlyCharge;
import com.uplus.item.device.exception.DeviceAndPlanNotFoundException;
import com.uplus.item.device.exception.DeviceNotFoundException;
import com.uplus.item.device.repository.DeviceRepository;
import com.uplus.item.discount.domain.Discount;
import com.uplus.item.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DeviceServiceByDongWan {

    private final DeviceRepository deviceRepository;
    private final DiscountRepository discountRepository;

    public GetDeviceOptionsResponse getDeviceOptions(String code) {
        Device findDevice = deviceRepository.findByCode(code)
                .orElseThrow(() -> new DeviceNotFoundException(
                        "code : " + code + "\n" +
                        "Exception : Device Not Found"));

        List<DeviceDetail> deviceDetails = findDevice.getDeviceDetails();
        List<DeviceOptionsDetail> detailPerColor = new ArrayList<>();

        for (DeviceDetail deviceDetail: deviceDetails) {
            detailPerColor.add(DeviceOptionsDetail.of(deviceDetail));
        }

        return GetDeviceOptionsResponse.of(findDevice, detailPerColor);
    }

    public GetDevicePricesResponse getDevicePrices(String code, String planName) {
        Discount discount = discountRepository.findByDeviceCodeAndPlanName(code, planName)
                .orElseThrow(() -> new DeviceAndPlanNotFoundException(
                        "code : " + code + "\n" +
                        "planName : " + planName + "\n" +
                        "Exception : Device And PlanName Not Found"));

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
        MonthlyCharge contractDiscount = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(contractDiscount);

        // 선택 약정 24개월
        // 선택 약정 12개월과 동일한 월별 요금 적용됨
        monthlyChargeList.add(contractDiscount);

        if (contractDiscount.getTotalCharge().get(0) < deviceDiscount.getTotalCharge().get(0))
            recommendedIndex = 2;

        //할인 없음
        calculatedPlanCharge = planCharge;
        MonthlyCharge noDiscount = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge);
        monthlyChargeList.add(noDiscount);

        return GetDevicePricesResponse.of(device, monthlyChargeList, recommendedIndex);
    }
}