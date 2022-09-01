package com.uplus.order.controller;

import com.uplus.order.domain.payload.OrderRequest;
import com.uplus.order.service.KafkaOrderService;
import com.uplus.order.service.OrderService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("api/order")
public class OrderController {

    private final OrderService orderService;

    @Operation(summary = "Order List")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Order Not Found")
    })
    @GetMapping
    public ResponseEntity<?> getOrders() {
        return new ResponseEntity<>(orderService.getOrderList(), HttpStatus.OK);
    }

    @Operation(summary = "Create Order")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Create Order Failed")
    })
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) throws IOException {
        orderService.createOrder(orderRequest);
        return new ResponseEntity<>("주문 생성", HttpStatus.OK);
    }

    @Operation(summary = "Delete Order")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Order Not Found")
    })
    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderNumber) throws IOException {
        orderService.deleteOrder(orderNumber);
        return new ResponseEntity<>("주문 삭제", HttpStatus.OK);
    }
}
