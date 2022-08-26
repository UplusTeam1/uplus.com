package com.lguplus.project.device.domain.payload;

import com.lguplus.project.device.domain.DeviceDetail;
import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceDetailResponse {

    private String color;

    private String rgb;

    private List<String> picPaths;

    private Integer stock;

    public static DeviceDetailResponse of(DeviceDetail deviceDetail) {
        return DeviceDetailResponse.builder()
                .color(deviceDetail.getColor())
                .rgb(deviceDetail.getRgb())
                .picPaths(csvToList(deviceDetail.getPicPaths()))
                .stock(deviceDetail.getStock())
                .build();
    }

    private static List<String> csvToList(String csv) {
        List<String> list = new ArrayList<>();
        StringTokenizer st = new StringTokenizer(csv, ",");
        while (st.hasMoreTokens()) {
            list.add(st.nextToken());
        }
        return list;
    }
}
