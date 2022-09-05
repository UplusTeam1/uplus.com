package com.uplus.item.device.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.item.device.domain.payload.KafkaCreateOrderRequest;
import com.uplus.item.device.domain.payload.KafkaDeleteOrderRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@Slf4j
@RequiredArgsConstructor
public class KafkaConsumer {

    private final DeviceKafkaService deviceKafkaService;
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final String CREATE_ORDER = "createOrder";
    private static final String DELETE_ORDER = "deleteOrder";

    @KafkaListener(topics = CREATE_ORDER, groupId = CREATE_ORDER)
    public void consumeCreateOrder(String value) throws IOException {
        KafkaCreateOrderRequest kafkaCreateOrderRequest = MAPPER.readValue(value, KafkaCreateOrderRequest.class);
        deviceKafkaService.createOrder(kafkaCreateOrderRequest);

    }

    @KafkaListener(topics = DELETE_ORDER, groupId = DELETE_ORDER)
    public void consumeDeleteOrder(String value) throws IOException {
        KafkaDeleteOrderRequest kafkaDeleteOrderRequest = MAPPER.readValue(value, KafkaDeleteOrderRequest.class);
        deviceKafkaService.deleteOrder(kafkaDeleteOrderRequest);
    }

}
