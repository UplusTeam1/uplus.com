package com.lguplus.project.order.domain.payload;

import com.lguplus.project.order.domain.DiscountType;
import com.lguplus.project.order.domain.JoinType;

public class OrderRequest {

    private String deviceCode;
    private String planName;
    private JoinType joinType;
    private Integer monthlyFee;
    private DiscountType discountType;
}
