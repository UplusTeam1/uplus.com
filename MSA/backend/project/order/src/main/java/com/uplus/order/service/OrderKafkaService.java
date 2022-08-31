package com.uplus.order.service;

import com.uplus.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderKafkaService {

    private final OrderRepository orderRepository;
    
    //주문 생성
    
    //주문 삭제
}
