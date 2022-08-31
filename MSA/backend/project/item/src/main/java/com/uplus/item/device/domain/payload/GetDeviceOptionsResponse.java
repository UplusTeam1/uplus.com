package com.uplus.item.device.domain.payload;

import com.uplus.item.device.domain.Device;
import lombok.Builder;
import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
@Builder
public class GetDeviceOptionsResponse implements Serializable {

    private String code;
    private List<DeviceOptionsDetail> detailPerColor;
    private String name;
    private Integer price;
    private Integer storage;
    private Integer weeklySale;

    public static GetDeviceOptionsResponse of(Device device, List<DeviceOptionsDetail> detailPerColor) {

        return GetDeviceOptionsResponse.builder()
                .code(device.getCode())
                .detailPerColor(detailPerColor)
                .name(device.getName())
                .price(device.getPrice())
                .storage(device.getStorage())
                .weeklySale(device.getWeeklySale())
                .build();
    }
}

