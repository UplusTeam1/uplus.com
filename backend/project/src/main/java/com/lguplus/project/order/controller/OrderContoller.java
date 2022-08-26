package com.lguplus.project.order.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/order")
public class OrderContoller {

    @GetMapping
    public ResponseEntity<?> getOrders(){
        return new ResponseEntity<>("orderList", HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createOrder(){
        return new ResponseEntity<>("주문", HttpStatus.OK);
    }

    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<?> deleteOrder(){
        return new ResponseEntity<>("주문 삭제", HttpStatus.OK);
    }
}
