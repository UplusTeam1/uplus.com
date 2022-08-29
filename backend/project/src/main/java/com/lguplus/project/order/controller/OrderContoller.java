package com.lguplus.project.order.controller;

import com.lguplus.project.order.domain.payload.OrderRequest;
import com.lguplus.project.order.service.OrderService;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/order")
public class OrderContoller {

    private final OrderService orderService;

    @Operation(summary = "Order List")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Order Not Found")
    })
    @GetMapping
    public ResponseEntity<?> getOrders(){
        return new ResponseEntity<>(orderService.getOrderList(), HttpStatus.OK);
    }

    @Operation(summary = "Create Order")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Create Order Failed")
    })
    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest orderRequest) {
        return new ResponseEntity<>(orderService.createOrder(orderRequest), HttpStatus.OK);
    }

    @Operation(summary = "Delete Order")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Order Not Found")
    })
    @DeleteMapping("/{orderNumber}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long orderNumber){
        orderService.deleteOrder(orderNumber);
        return new ResponseEntity<>("주문 삭제", HttpStatus.OK);
    }
}
