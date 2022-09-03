package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.domain.DeviceDetail;
import com.lguplus.project.device.domain.payload.DeviceOptionsDetail;
import com.lguplus.project.device.domain.payload.DeviceOptionsResponse;
import com.lguplus.project.device.domain.payload.DevicePricesResponse;
import com.lguplus.project.device.domain.payload.MonthlyCharge;
import com.lguplus.project.device.exception.DeviceAndPlanNotFoundException;
import com.lguplus.project.device.exception.DeviceNotFoundException;
import com.lguplus.project.device.repository.DeviceRepository;
import com.lguplus.project.discount.domain.Discount;
import com.lguplus.project.discount.repository.DiscountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class DeviceServiceByDongWan {

    private final DeviceRepository deviceRepository;
    private final DiscountRepository discountRepository;

    @Value("${contract.discount.rate}")
    private double discountRate;
    @Value("${year.interest.rate}")
    private double yearInterestRate;

    public DeviceOptionsResponse getDeviceOptions(String code) {
        Device findDevice = deviceRepository.findByCode(code)
                .orElseThrow(() -> new DeviceNotFoundException(
                        "code : " + code + "\n" +
                                "Exception : Device Not Found"));

        List<DeviceDetail> deviceDetails = findDevice.getDeviceDetails();
        List<DeviceOptionsDetail> detailPerColor = new ArrayList<>();

        for (DeviceDetail deviceDetail: deviceDetails) {
            detailPerColor.add(DeviceOptionsDetail.of(deviceDetail));
        }

        return DeviceOptionsResponse.of(findDevice, detailPerColor);
    }

    public DevicePricesResponse getDevicePrices(String code, String planName) {
        Discount discount = discountRepository.findByDeviceCodeAndPlanName(code, planName)
                .orElseThrow(() -> new DeviceAndPlanNotFoundException(
                        "code : " + code + "\n" +
                                "planName : " + planName + "\n" +
                                "Exception : Device And PlanName Not Found"));

        Device device = discount.getDevice();
        double discountedRate = 1 - discountRate;
        int deviceCharge = device.getPrice();
        int planCharge = discount.getPlan().getPrice();
        int deviceDiscount = discount.getDeviceDiscount();
        int contractPlanCharge = (int) Math.floor(planCharge * discountedRate);

        List<MonthlyCharge> monthlyChargeList = new ArrayList<>();

        // 공시지원금
        makeMonthlyCharge(monthlyChargeList, planCharge, deviceCharge - deviceDiscount, yearInterestRate);

        // 선택 약정 12개월
        makeMonthlyCharge(monthlyChargeList, contractPlanCharge, deviceCharge, yearInterestRate);

        // 선택 약정 12개월, 24개월
        // 선택 약정 12개월과 동일한 월별 요금 적용됨
        makeMonthlyCharge(monthlyChargeList, contractPlanCharge, deviceCharge, yearInterestRate);

        // 할인 없음
        makeMonthlyCharge(monthlyChargeList, planCharge, deviceCharge, yearInterestRate);

        // 추천 할인 제도 선정
        int recommendedIndex = selectRecommendedIndex(monthlyChargeList);

        // 총 이자 계산
        List<Integer> defaultInterestList = makeInterestList(deviceCharge, monthlyChargeList.get(2));
        List<Integer> discountedInterestList = makeInterestList(deviceCharge - deviceDiscount, monthlyChargeList.get(0));


        return DevicePricesResponse.of(
                device, deviceDiscount, defaultInterestList,
                discountedInterestList, monthlyChargeList, recommendedIndex);
    }

    private void makeMonthlyCharge(
            List<MonthlyCharge> monthlyChargeList, int calculatedPlanCharge,
            int calculatedDeviceCharge, double yearInterestRate) {
        MonthlyCharge monthlyCharge = MonthlyCharge.of(calculatedDeviceCharge, calculatedPlanCharge, yearInterestRate);
        monthlyChargeList.add(monthlyCharge);
    }

    private int selectRecommendedIndex(List<MonthlyCharge> monthlyChargeList) {
        int recommendedIndex = 0;
        int deviceDiscountCharge = monthlyChargeList.get(0).getTotalCharge().get(1);
        int planDiscountCharge = monthlyChargeList.get(2).getTotalCharge().get(1);
        if (planDiscountCharge > deviceDiscountCharge) {
            recommendedIndex = 2;
        }
        return recommendedIndex;
    }

    private List<Integer> makeInterestList(int totalDeviceCharge,  MonthlyCharge monthlyCharge) {
        int[] contractMonthArray = new int[] {1, 12, 24, 36};
        List<Integer> interestList = new ArrayList<>();
        List<Integer> deviceChargeList = monthlyCharge.getDeviceCharge();
        for (int index=0; index<deviceChargeList.size(); index++) {
            int monthDeviceCharge = deviceChargeList.get(index);
            int contractMonth = contractMonthArray[index];
            if (monthDeviceCharge == 0) {
                interestList.add(0);
                continue;
            }
            interestList.add(monthDeviceCharge * contractMonth - totalDeviceCharge);
        }
        return interestList;
    }
}
