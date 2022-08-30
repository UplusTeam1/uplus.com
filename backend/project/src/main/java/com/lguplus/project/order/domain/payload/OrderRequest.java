package com.lguplus.project.order.domain.payload;

import com.lguplus.project.order.domain.DiscountType;
import com.lguplus.project.order.domain.JoinType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderRequest implements Serializable {

    private String deviceCode;
    private String planName;
    private JoinType joinType;
    private Integer monthlyFee;
    private DiscountType discountType;
    private String color;
}
