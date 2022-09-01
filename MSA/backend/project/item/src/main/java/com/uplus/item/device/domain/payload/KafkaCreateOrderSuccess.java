package com.uplus.item.device.domain.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaCreateOrderSuccess implements Serializable {

    private String deviceName;
    private String picPaths;

    public KafkaCreateOrderSuccess(String deviceName, String picPaths) {
        this.deviceName = deviceName;
        this.picPaths = picPaths;
    }
}
