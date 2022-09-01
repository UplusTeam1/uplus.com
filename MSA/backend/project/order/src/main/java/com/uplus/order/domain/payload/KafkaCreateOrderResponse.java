package com.uplus.order.domain.payload;

import lombok.*;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class KafkaCreateOrderResponse implements Serializable {

    private Long orderNumber;
    private String deviceName;
    private String picPaths;
}
