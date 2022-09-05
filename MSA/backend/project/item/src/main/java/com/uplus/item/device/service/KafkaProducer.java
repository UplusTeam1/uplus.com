package com.uplus.item.device.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.item.device.domain.payload.KafkaCreateOrderSuccessResponse;
import com.uplus.item.device.domain.payload.KafkaCreateOrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final String CREATE_ORDER_SUCCESS = "createOrderSuccess";
    private static final String CREATE_ORDER_FAIL = "createOrderFail";
    private static final String DELETE_ORDER_SUCCESS = "deleteOrderSuccess";
    private static final String DELETE_ORDER_FAIL = "deleteOrderFail";

    public void sendCreateOrderSuccessObject(KafkaCreateOrderSuccessResponse kafkaCreateOrderSuccessResponse) throws IOException{
        String value = MAPPER.writeValueAsString(kafkaCreateOrderSuccessResponse);
        this.kafkaTemplate.send(CREATE_ORDER_SUCCESS, value);
    }

    public void sendCreateOrderFailMessage(Long orderNumber) {
        String value = orderNumber.toString();
        this.kafkaTemplate.send(CREATE_ORDER_FAIL, value);
    }

    public void sendDeleteOrderSuccessMessage() {
        this.kafkaTemplate.send(DELETE_ORDER_SUCCESS, DELETE_ORDER_SUCCESS);
    }

    public void sendDeleteOrderFailMessage() {
        this.kafkaTemplate.send(DELETE_ORDER_FAIL, DELETE_ORDER_FAIL);
    }

}
