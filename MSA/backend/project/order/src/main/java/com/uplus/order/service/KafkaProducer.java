package com.uplus.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.order.domain.payload.KafkaCreateOrderRequest;
import com.uplus.order.domain.payload.KafkaDeleteOrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private static final String createOrderTopic = "createOrder";
    private static final String deleteOrderTopic = "deleteOrder";

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public ListenableFuture<SendResult<String, Object>> sendCreateOrder(KafkaCreateOrderRequest kafkaCreateOrderRequest) throws IOException {
        String value = objectMapper.writeValueAsString(kafkaCreateOrderRequest);
        return this.kafkaTemplate.send(createOrderTopic, value);
    }

    public ListenableFuture<SendResult<String, Object>> sendDeleteOrder(KafkaDeleteOrderRequest kafkaDeleteOrderRequest) throws IOException {
        String value = objectMapper.writeValueAsString(kafkaDeleteOrderRequest);
        return this.kafkaTemplate.send(deleteOrderTopic, value);
    }
}
