package com.uplus.order.service;

import com.uplus.order.domain.DiscountType;
import com.uplus.order.domain.JoinType;
import com.uplus.order.domain.Order;
import com.uplus.order.domain.payload.KafkaCreateOrderRequest;
import com.uplus.order.domain.payload.KafkaDeleteOrderRequest;
import com.uplus.order.domain.payload.OrderRequest;
import com.uplus.order.domain.payload.OrderResponse;
import com.uplus.order.exception.CreateOrderFailedException;
import com.uplus.order.exception.DeleteOrderFailedException;
import com.uplus.order.exception.OrderNotFoundException;
import com.uplus.order.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final OrderRepository orderRepository;
    private final KafkaProducer kafkaProducer;

    public List<OrderResponse> getOrderList() {
        return orderRepository.findByDeviceNameNotNull()
                .stream()
                .map(OrderResponse::of)
                .collect(Collectors.toList());
    }

    public void createOrder(OrderRequest orderRequest) throws IOException{
        LocalDate joinDate = LocalDate.now();
        JoinType joinType = orderRequest.getJoinType();
        DiscountType discountType = orderRequest.getDiscountType();
        String deviceCode = orderRequest.getDeviceCode();
        String planName = orderRequest.getPlanName();
        Integer monthlyFee = orderRequest.getMonthlyFee();
        String color = orderRequest.getColor();

        Order order = Order.builder()
                .joinDate(joinDate)
                .joinType(joinType)
                .discountType(discountType)
                .deviceCode(deviceCode)
                .planName(planName)
                .monthlyFee(monthlyFee)
                .color(color)
                .build();

        KafkaCreateOrderRequest kafkaCreateOrderRequest = KafkaCreateOrderRequest.of(orderRepository.save(order));

        //kafka topic send
        ListenableFuture<SendResult<String, Object>> future = kafkaProducer.sendCreateOrder(kafkaCreateOrderRequest);
        future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>(){
            @Override
            public void onSuccess(SendResult<String, Object> result) {
                logger.info("Topic send Success");
            }
            @Override
            public void onFailure(Throwable ex) {
                throw new CreateOrderFailedException("Exception : Create Order Failed");
            }
        });

    }

    public void deleteOrder(Long orderNumber) throws IOException{
        String str = orderNumber.toString().substring(8);
        Long realOrderNumber = Long.parseLong(str);

        Order order = orderRepository.findById(realOrderNumber)
                .orElseThrow(() -> new OrderNotFoundException(
                        "orderNumber:" + realOrderNumber + "\n" + "Exception : Order Not Found"
                ));
        KafkaDeleteOrderRequest kafkaDeleteOrderRequest = KafkaDeleteOrderRequest.builder()
                .orderNumber(realOrderNumber)
                .deviceCode(order.getDeviceCode())
                .color(order.getColor())
                .build();

        //kafka topic send
        ListenableFuture<SendResult<String, Object>> future = kafkaProducer.sendDeleteOrder(kafkaDeleteOrderRequest);
        future.addCallback(new ListenableFutureCallback<SendResult<String, Object>>(){
            @Override
            public void onSuccess(SendResult<String, Object> result) {
                logger.info("Topic send Success");
                orderRepository.delete(order);
            }
            @Override
            public void onFailure(Throwable ex) {
                throw new DeleteOrderFailedException("Exception : Delete Order Failed");
            }
        });

    }
}

