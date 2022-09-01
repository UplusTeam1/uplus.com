package com.uplus.item.device.domain.payload;

import lombok.Data;

import java.io.Serializable;

@Data
public class KafkaCreateOrderSuccessResponse implements Serializable {

    private Long orderNumber;
    private String deviceCode;
    private String picPaths;

    public KafkaCreateOrderSuccessResponse() {
    }

    public KafkaCreateOrderSuccessResponse(Long orderNumber, String deviceCode, String picPaths) {
        this.orderNumber = orderNumber;
        this.deviceCode = deviceCode;
        this.picPaths = picPaths;
    }
}
