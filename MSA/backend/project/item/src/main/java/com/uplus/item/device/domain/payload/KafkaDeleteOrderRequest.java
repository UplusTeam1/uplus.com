package com.uplus.item.device.domain.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaDeleteOrderRequest implements Serializable {

    private Long orderNumber;
    private String deviceCode;
    private String color;

    public KafkaDeleteOrderRequest() {
    }

    public KafkaDeleteOrderRequest(Long orderNumber, String deviceCode, String color) {
        this.orderNumber = orderNumber;
        this.deviceCode = deviceCode;
        this.color = color;
    }
}
