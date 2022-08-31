package com.uplus.item.device.domain.payload;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaOrderDetail implements Serializable {

    private String deviceCode;
    private String color;

    private String planName;

    public KafkaOrderDetail(String deviceCode, String color, String planName) {
        this.deviceCode = deviceCode;
        this.color = color;
        this.planName = planName;
    }
}
