package com.lguplus.project.order.controller;

import com.lguplus.project.order.domain.payload.OrderRequest;
import com.lguplus.project.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/order")
public class OrderContoller {

    private final OrderService orderService;
    @GetMapping
    public ResponseEntity<?> getOrders(){
        return new ResponseEntity<>(orderService.getOrderList(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        return new ResponseEntity<>(orderService.createOrder(orderRequest), HttpStatus.OK);
    }

    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderNumber){
        orderService.deleteOrder(orderNumber);
        return new ResponseEntity<>("주문 삭제", HttpStatus.OK);
    }
}
