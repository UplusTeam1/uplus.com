package com.uplus.order.domain.payload;

import com.uplus.order.domain.DiscountType;
import com.uplus.order.domain.JoinType;
import com.uplus.order.domain.Order;
import lombok.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

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
    private LocalDate joinDate;
    private Integer monthlyFee;
    private DiscountType discountType;
    private String color;
    private String deviceName;
    private List<String> picPaths;

    public static OrderResponse of(Order order){
        return OrderResponse.builder()
                .orderNumber(order.getJoinDate().format(DateTimeFormatter.ofPattern("yyyyMMdd"))+order.getOrderNumber())
                .deviceCode(order.getDeviceCode())
                .planName(order.getPlanName())
                .joinType(order.getJoinType())
                .joinDate(order.getJoinDate())
                .monthlyFee(order.getMonthlyFee())
                .discountType(order.getDiscountType())
                .color(order.getColor())
//                .deviceName(orde)
                .build();
    }
}
