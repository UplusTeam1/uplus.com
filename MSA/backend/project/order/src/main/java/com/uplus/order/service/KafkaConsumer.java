package com.uplus.order.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.order.domain.payload.KafkaCreateOrderResponse;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @KafkaListener(topics = createOrderSuccess, groupId = createOrderSuccess)
    public void consumeCreateOrderSuccess(String value) throws IOException {
        KafkaCreateOrderResponse kafkaCreateOrderResponse = objectMapper.readValue(value, KafkaCreateOrderResponse.class);
        kafkaOrderService.updateOrder(kafkaCreateOrderResponse);
    }

    @KafkaListener(topics = createOrderFail, groupId = createOrderFail)
    public void consumeCreateOrderFail(String orderNumber) throws IOException {
        kafkaOrderService.deleteOrder(Long.parseLong(orderNumber));
    }

    @KafkaListener(topics = deleteOrderSuccess, groupId = deleteOrderSuccess)
    public void consumeDeleteOrderSuccess(String message) throws IOException {
        logger.error(message);
    }

    @KafkaListener(topics = deleteOrderFail, groupId = deleteOrderFail)
    public void consumeDeleteOrderFail(String message) throws IOException {
        logger.error(message);
    }
}
