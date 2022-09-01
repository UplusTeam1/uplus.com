package com.uplus.order.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderNumber;

    private LocalDate joinDate;

    @Enumerated(EnumType.STRING)
    private JoinType joinType;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    private String deviceCode;

    private String deviceName;

    private String planName;

    private Integer monthlyFee;

    private String color;

    @Column(length = 1000)
    private String picPaths;

    public Order saveOrder(LocalDate joinDate, JoinType joinType, DiscountType discountType, String deviceCode,
                          String planName, Integer monthlyFee, String color){
        this.joinDate = joinDate;
        this.joinType = joinType;
        this.discountType = discountType;
        this.deviceCode = deviceCode;
        this.planName = planName;
        this.monthlyFee = monthlyFee;
        this.color = color;

        return this;
    }
    public Order updateOrder(String deviceName, String picPaths){
        this.deviceName = deviceName;
        this.picPaths = picPaths;

        return this;
    }
}
