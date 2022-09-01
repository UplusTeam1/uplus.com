package com.uplus.item.device.service;

import com.uplus.item.device.domain.payload.KafkaCreateOrderSuccess;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
@RequiredArgsConstructor
public class KafkaProducer {

    private static final String createOrderSuccess = "createOrderSuccess";
    private static final String createOrderFail = "createOrderFail";
    private static final String deleteOrderSuccess = "deleteOrderSuccess";
    private static final String deleteOrderFail = "deleteOrderFail";
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public void sendCreateOrderSuccessObject(KafkaCreateOrderSuccess kafkaCreateOrderSuccess) {
        this.kafkaTemplate.send(createOrderSuccess, kafkaCreateOrderSuccess);
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

}
