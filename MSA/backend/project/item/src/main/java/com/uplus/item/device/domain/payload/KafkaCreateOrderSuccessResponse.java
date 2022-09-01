package com.uplus.item.device.domain.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaCreateOrderSuccessResponse implements Serializable {

    private Long orderNumber;
    private String deviceName;
    private String picPaths;

    public KafkaCreateOrderSuccessResponse() {
    }

    public KafkaCreateOrderSuccessResponse(Long orderNumber, String deviceName, String picPaths) {
        this.orderNumber = orderNumber;
        this.deviceName = deviceName;
        this.picPaths = picPaths;
    }
}
