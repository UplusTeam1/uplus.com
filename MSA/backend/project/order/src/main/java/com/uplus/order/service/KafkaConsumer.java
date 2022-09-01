package com.uplus.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.order.domain.payload.KafkaCreateOrderResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class KafkaConsumer {

    private final KafkaOrderService kafkaOrderService;

    private static final String createOrderSuccess = "createOrderSuccess";
    private static final String createOrderFail = "createOrderFail";
    private static final String deleteOrderSuccess = "deleteOrderSuccess";
    private static final String deleteOrderFail = "deleteOrderFail";

    private static final ObjectMapper objectMapper = new ObjectMapper();

    @KafkaListener(topics = createOrderSuccess, groupId = "createOrder")
    public void consumeCreateOrderSuccess(String value) throws IOException {
        KafkaCreateOrderResponse kafkaCreateOrderResponse = objectMapper.readValue(value, KafkaCreateOrderResponse.class);
        kafkaOrderService.updateOrder(kafkaCreateOrderResponse);
    }

    @KafkaListener(topics = createOrderFail, groupId = "createOrder")
    public void consumeCreateOrderFail(String orderNumber) throws IOException {
        Long number = Long.parseLong(orderNumber);
        kafkaOrderService.deleteOrder(number);
    }

    @KafkaListener(topics = deleteOrderSuccess, groupId = "deleteOrder")
    public void consumeDeleteOrderSuccess(String message) throws IOException {
        System.out.println(message);
    }

    @KafkaListener(topics = deleteOrderFail, groupId = "deleteOrder")
    public void consumeDeleteOrderFail(String message) throws IOException {
        System.out.println(message);
    }
}
