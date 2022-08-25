package com.lguplus.project.order.domain.payload;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {

    private Long id;
    private String join_type;
    private LocalDateTime join_date;
    private Integer monthly_fee;
    private String discount_type;
}
