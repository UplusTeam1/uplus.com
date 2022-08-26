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

    public static MonthlyCharge of(int calculatedDeviceCharge, int calculatedPlanCharge) {
        List<Integer> deviceCharge = new ArrayList<>();
        List<Integer> totalCharge = new ArrayList<>();

        deviceCharge.add(calculatedDeviceCharge / 12);
        totalCharge.add(calculatedPlanCharge + calculatedDeviceCharge / 12);

        deviceCharge.add(calculatedDeviceCharge / 24);
        totalCharge.add(calculatedPlanCharge + calculatedDeviceCharge / 24);

        deviceCharge.add(calculatedDeviceCharge / 36);
        totalCharge.add(calculatedPlanCharge + calculatedDeviceCharge / 36);

        return MonthlyCharge.builder()
                .deviceCharge(deviceCharge)
                .planCharge(calculatedPlanCharge)
                .totalCharge(totalCharge)
                .build();
    }
}
