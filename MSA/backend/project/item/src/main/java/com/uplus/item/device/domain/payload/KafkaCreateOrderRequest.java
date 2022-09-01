package com.uplus.item.device.domain.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaCreateOrderRequest implements Serializable {

    private Long orderNumber;
    private String deviceCode;
    private String color;
    private String planName;

    public KafkaCreateOrderRequest() {
    }

    public KafkaCreateOrderRequest(Long orderNumber, String deviceCode, String color, String planName) {
        this.orderNumber = orderNumber;
        this.deviceCode = deviceCode;
        this.color = color;
        this.planName = planName;
    }

}
