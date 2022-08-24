package com.lguplus.project.device.domain.payload;

import com.lguplus.project.device.domain.Device;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceResponse {
    private Long id;
    private String name;
    private String code;
    private String colors;
    private String storage;
    private String picPaths;
    private Integer stock;
    private Integer price;

    public static DeviceResponse of(Device device) {
        return DeviceResponse.builder()
                .id(device.getId())
                .name(device.getName())
                .code(device.getCode())
                .colors(device.getColors())
                .storage(device.getStorage())
                .picPaths(device.getPicPaths())
                .stock(device.getStock())
                .price(device.getPrice())
                .build();
    }
}
