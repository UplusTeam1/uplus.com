package com.uplus.item.device.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uplus.item.device.domain.payload.KafkaCreateOrderSuccessResponse;
import com.uplus.item.device.domain.payload.KafkaDeleteOrderRequest;
import com.uplus.item.device.domain.payload.KafkaCreateOrderRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.io.IOException;


@Service
@RequiredArgsConstructor
public class KafkaProducer {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    private static final String createOrderSuccess = "createOrderSuccess";
    private static final String createOrderFail = "createOrderFail";
    private static final String deleteOrderSuccess = "deleteOrderSuccess";
    private static final String deleteOrderFail = "deleteOrderFail";

    // Test kafka
    private static final String testKafka = "testKafka";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendCreateOrderSuccessObject(KafkaCreateOrderSuccessResponse kafkaCreateOrderSuccessResponse) {
        this.kafkaTemplate.send(createOrderSuccess, kafkaCreateOrderSuccessResponse);
    }

    public void sendCreateOrderFailMessage() {
        this.kafkaTemplate.send(createOrderFail, createOrderFail);
    }

    public void sendDeleteOrderSuccessMessage() {
        this.kafkaTemplate.send(deleteOrderSuccess, deleteOrderSuccess);
    }

    public void sendDeleteOrderFailMessage() {
        this.kafkaTemplate.send(deleteOrderFail, deleteOrderFail);
    }

    // Test kafka
    public void sendTestKafka(KafkaCreateOrderRequest kafkaCreateOrderRequest) throws IOException {
        System.out.println("KafkaProducer.sendTestKafka");
        System.out.println("kafkaOrderDetail = " + kafkaCreateOrderRequest.toString());
        String value = MAPPER.writeValueAsString(kafkaCreateOrderRequest);
        this.kafkaTemplate.send(testKafka, value);
    }

}
