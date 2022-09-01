package com.uplus.item.device.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.item.device.domain.payload.KafkaCreateOrderRequest;
import com.uplus.item.device.domain.payload.KafkaDeleteOrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private final DeviceKafkaService deviceKafkaService;

    @KafkaListener(topics = "createOrder", groupId = "createOrder")
    public void consumeCreateOrder(KafkaCreateOrderRequest kafkaCreateOrderRequest) throws IOException {
        deviceKafkaService.createOrder(kafkaCreateOrderRequest);

    }

    @KafkaListener(topics = "deleteOrder", groupId = "deleteOrder")
    public void consumeDeleteOrder(KafkaDeleteOrderRequest kafkaDeleteOrderRequest) throws IOException {
        deviceKafkaService.deleteOrder(kafkaDeleteOrderRequest);
    }

    @KafkaListener(topics = "testKafka", groupId = "testKafka")
    public void consumeTestKafka(String value) throws IOException {
        System.out.println("KafkaConsumer.consumeTestKafka");
        System.out.println("value = " + value);
        KafkaCreateOrderRequest kafkaCreateOrderRequest = MAPPER.readValue(value, KafkaCreateOrderRequest.class);
        System.out.println("kafkaOrderDetail.toString() = " + kafkaCreateOrderRequest.toString());
        deviceKafkaService.testKafka(kafkaCreateOrderRequest);
    }
}
