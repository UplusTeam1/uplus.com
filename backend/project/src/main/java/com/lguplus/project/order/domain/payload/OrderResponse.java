package com.lguplus.project.order.domain.payload;

import com.lguplus.project.order.domain.DiscountType;
import com.lguplus.project.order.domain.JoinType;
import com.lguplus.project.order.domain.Order;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private String orderNumber;
    private String deviceCode;
    private String planName;
    private JoinType joinType;
    private LocalDateTime joinDate;
    private Integer monthlyFee;
    private DiscountType discountType;


    public static OrderResponse of(Order order){
        return OrderResponse.builder()
                .orderNumber(order.getOrderNumber())
                .deviceCode(order.getDevice().getCode())
                .planName(order.getPlan().getName())
                .joinType(order.getJoinType())
                .joinDate(order.getJoinDate())
                .monthlyFee(order.getMonthlyFee())
                .discountType(order.getDiscountType())
                .build();
    }
}
