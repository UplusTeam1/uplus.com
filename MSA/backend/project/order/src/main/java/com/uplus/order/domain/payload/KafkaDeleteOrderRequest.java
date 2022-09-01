package com.uplus.order.domain.payload;

import lombok.Builder;
import lombok.Data;

import java.io.Serializable;

@Data
@Builder
public class KafkaDeleteOrderRequest implements Serializable {

    private Long orderNumber;
    private String deviceCode;
    private String color;
}
