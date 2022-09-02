package com.lguplus.project.device.domain.payload;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
public class MonthlyCharge {

    List<Integer> deviceCharge;
    Integer planCharge;
    List<Integer> totalCharge;

    public static MonthlyCharge of(int deviceCharge, int planCharge) {
        List<Integer> deviceChargeList = new ArrayList<>();
        List<Integer> totalChargeList = new ArrayList<>();

        int deviceChargeWithInterest = getDeviceChargeWithInterest(deviceCharge, 12);
        deviceChargeList.add(deviceChargeWithInterest);
        totalChargeList.add(planCharge + deviceChargeWithInterest);

        deviceChargeWithInterest = getDeviceChargeWithInterest(deviceCharge, 24);
        deviceChargeList.add(deviceChargeWithInterest);
        totalChargeList.add(planCharge + deviceChargeWithInterest);

        deviceChargeWithInterest = getDeviceChargeWithInterest(deviceCharge, 36);
        deviceChargeList.add(deviceChargeWithInterest);
        totalChargeList.add(planCharge + deviceChargeWithInterest);

        return MonthlyCharge.builder()
                .deviceCharge(deviceChargeList)
                .planCharge(planCharge)
                .totalCharge(totalChargeList)
                .build();
    }

    private static int getDeviceChargeWithInterest(int deviceCharge, int contractMonth) {
        final double interestRate = 0.00492;
        double varianceRate = power(1 + interestRate, contractMonth);
        int monthlyDeviceCharge =
                (int)Math.round(deviceCharge * interestRate * varianceRate / (varianceRate - 1));
        monthlyDeviceCharge -= (monthlyDeviceCharge % 10);
        return monthlyDeviceCharge;
    }

    private static double power(double base, double exponent) {
        double result = base;
        for (int index = 1; index < exponent; index++) {
            result *= base;
        }
        System.out.println("result = " + result);
        return result;
    }
}
