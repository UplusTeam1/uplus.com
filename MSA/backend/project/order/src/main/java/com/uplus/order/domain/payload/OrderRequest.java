package com.uplus.order.domain.payload;

import com.uplus.order.domain.DiscountType;
import com.uplus.order.domain.JoinType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest {

    private String deviceCode;
    private String planName;
    private JoinType joinType;
    private Integer monthlyFee;
    private DiscountType discountType;
    private String color;
}
