package com.uplus.order.domain.payload;


import com.uplus.order.domain.Order;
import lombok.*;

import java.io.Serializable;

@Data
@Builder
public class KafkaCreateOrderRequest implements Serializable {

    private Long orderNumber;
    private String deviceCode;
    private String color;
    private String planName;

    public static KafkaCreateOrderRequest of(Order order){
        return KafkaCreateOrderRequest.builder()
                .orderNumber(order.getOrderNumber())
                .deviceCode(order.getDeviceCode())
                .color(order.getColor())
                .planName(order.getPlanName())
                .build();
    }

}
