package com.lguplus.project.device.domain.payload;

import com.lguplus.project.device.domain.DeviceDetail;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@Builder
public class DeviceOptionsDetail implements Serializable {

    private String color;
    private String rgb;
    private List<String> picPaths;
    private Integer stock;

    public static DeviceOptionsDetail of(DeviceDetail deviceDetail) {
        List<String> picPaths = new ArrayList<>();
        String[] picPathsArray = deviceDetail.getPicPaths().split(",");
        List<String> picPathsList = Arrays.asList(picPathsArray);

        return DeviceOptionsDetail.builder()
                .color(deviceDetail.getColor())
                .rgb(deviceDetail.getRgb())
                .picPaths(picPathsList)
                .stock(deviceDetail.getStock())
                .build();
    }
}
