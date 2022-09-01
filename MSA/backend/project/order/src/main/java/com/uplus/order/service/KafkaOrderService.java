package com.uplus.order.service;

import com.uplus.order.domain.Order;
import com.uplus.order.domain.payload.KafkaCreateOrderResponse;
import com.uplus.order.exception.CreateOrderFailedException;
import com.uplus.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class KafkaOrderService {

    private final OrderRepository orderRepository;

    public void updateOrder(KafkaCreateOrderResponse kafkaCreateOrderResponse){
        Order order = orderRepository.findById(kafkaCreateOrderResponse.getOrderNumber())
                .orElseThrow(()->new CreateOrderFailedException("Exception : Create Order Failed"));

        orderRepository.save(order.updateOrder(kafkaCreateOrderResponse.getDeviceName(), kafkaCreateOrderResponse.getPicPaths()));
    }

    public void deleteOrder(Long orderNumber){
        Order order = orderRepository.findById(orderNumber)
                .orElseThrow(()->new CreateOrderFailedException("Exception : Create Order Failed"));

        orderRepository.delete(order);
    }

}
