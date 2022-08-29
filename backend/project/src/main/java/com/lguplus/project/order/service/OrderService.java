package com.lguplus.project.order.service;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.exception.DeviceNotFoundException;
import com.lguplus.project.device.repository.DeviceRepository;
import com.lguplus.project.order.domain.Order;
import com.lguplus.project.order.domain.payload.OrderRequest;
import com.lguplus.project.order.domain.payload.OrderResponse;
import com.lguplus.project.order.exception.OrderNotFoundException;
import com.lguplus.project.order.repository.OrderRepository;
import com.lguplus.project.plan.domain.Plan;
import com.lguplus.project.plan.exception.PlanNotFoundException;
import com.lguplus.project.plan.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final DeviceRepository deviceRepository;
    private final PlanRepository planRepository;

    public List<OrderResponse> getOrderList(){
        return orderRepository.findAll()
                .stream()
                .map(OrderResponse::of)
                .collect(Collectors.toList());
    }

    public OrderResponse createOrder(OrderRequest orderRequest){

        LocalDate localDate = LocalDate.now();

        Device device = deviceRepository.findByCode(orderRequest.getDeviceCode())
                .orElseThrow(() -> new DeviceNotFoundException(
                        "code : " + orderRequest.getDeviceCode() + "\n" + "Exception : Device Not Found"));

        Plan plan = planRepository.findByName(orderRequest.getPlanName())
                .orElseThrow(() -> new PlanNotFoundException(
                        ":" + orderRequest.getPlanName() + "\n" + "Exception : Plan Not Found"));

        Order order = Order.builder()
                .device(device)
                .plan(plan)
                .joinType(orderRequest.getJoinType())
                .joinDate(localDate)
                .monthlyFee(orderRequest.getMonthlyFee())
                .discountType(orderRequest.getDiscountType())
                .build();

        orderRepository.save(order);

        return orderRepository.findById(order.getOrderNumber())
                .map(OrderResponse::of)
                .orElseThrow(() -> new OrderNotFoundException(
                        "orderNumber:" + order.getOrderNumber() + "\n" + "Exception : Create Order Failed"
                ));
    }

    public void deleteOrder(Long orderNumber){

        String str = orderNumber.toString().substring(8);
        Long realOrderNumber = Long.parseLong(str);

        Order order = orderRepository.findById(realOrderNumber)
                .orElseThrow(() -> new OrderNotFoundException(
                        "orderNumber:" + realOrderNumber + "\n" + "Exception : Order Not Found"
                ));

        orderRepository.delete(order);
    }
}
