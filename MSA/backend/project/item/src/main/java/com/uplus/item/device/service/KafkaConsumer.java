package com.uplus.item.device.service;

import com.uplus.item.device.domain.payload.KafkaOrderDetail;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {

    private final DeviceKafkaService deviceKafkaService;

    @KafkaListener(topics = "createOrder", groupId = "createOrder")
    public void consumeCreateOrder(KafkaOrderDetail kafkaOrderDetail) throws IOException {
        deviceKafkaService.createOrder(kafkaOrderDetail);
    }

    @KafkaListener(topics = "deleteOrder", groupId = "deleteOrder")
    public void consumeDeleteOrder(KafkaOrderDetail kafkaOrderDetail) throws IOException {
        deviceKafkaService.createOrder(kafkaOrderDetail);
    }
}
