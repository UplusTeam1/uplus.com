package com.lguplus.project.device.domain.payload;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MonthlyCharge {

    private List<Integer> deviceCharge;
    private Integer planCharge;
    private List<Integer> totalCharge;

    public static MonthlyCharge of(int deviceCharge, int planCharge, double yearInterestRate) {
        int[] contractMonthArray = new int[] {12, 24, 36};
        List<Integer> deviceChargeList = new ArrayList<>();
        List<Integer> totalChargeList = new ArrayList<>();

        deviceChargeList.add(deviceCharge);
        totalChargeList.add(planCharge);

        for (int contractMonth : contractMonthArray) {
            int deviceChargeWithInterest = getDeviceChargeWithInterest(deviceCharge, contractMonth, yearInterestRate);
            deviceChargeList.add(deviceChargeWithInterest);
            totalChargeList.add(planCharge + deviceChargeWithInterest);
        }

        return MonthlyCharge.builder()
                .deviceCharge(deviceChargeList)
                .planCharge(planCharge)
                .totalCharge(totalChargeList)
                .build();
    }

    private static int getDeviceChargeWithInterest(int deviceCharge, int contractMonth, double yearInterestRate) {
        double monthInterestRate = yearInterestRate / 12;
        double varianceRate = power(1 + monthInterestRate, contractMonth);
        int monthlyDeviceCharge =
                (int)Math.round(deviceCharge * monthInterestRate * varianceRate / (varianceRate - 1));
        monthlyDeviceCharge -= (monthlyDeviceCharge % 10);
        return monthlyDeviceCharge;
    }

    private static double power(double base, double exponent) {
        double result = base;
        for (int index = 1; index < exponent; index++) {
            result *= base;
        }
        return result;
    }
}
