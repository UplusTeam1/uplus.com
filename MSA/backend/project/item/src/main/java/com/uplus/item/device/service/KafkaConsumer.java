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
    public void consumeCreateOrder(String value) throws IOException {
        KafkaCreateOrderRequest kafkaCreateOrderRequest = MAPPER.readValue(value, KafkaCreateOrderRequest.class);
        deviceKafkaService.createOrder(kafkaCreateOrderRequest);

    }

    @KafkaListener(topics = "deleteOrder", groupId = "deleteOrder")
    public void consumeDeleteOrder(String value) throws IOException {
        KafkaDeleteOrderRequest kafkaDeleteOrderRequest = MAPPER.readValue(value, KafkaDeleteOrderRequest.class);
        deviceKafkaService.deleteOrder(kafkaDeleteOrderRequest);
    }

    @KafkaListener(topics = "testKafka", groupId = "testKafka")
    public void consumeTestKafka(String value) throws IOException {
        System.out.println("KafkaConsumer.consumeTestKafka");
        System.out.println("value = " + value);
        KafkaCreateOrderRequest kafkaCreateOrderRequest = MAPPER.readValue(value, KafkaCreateOrderRequest.class);
        deviceKafkaService.testKafka(kafkaCreateOrderRequest);
    }
}
