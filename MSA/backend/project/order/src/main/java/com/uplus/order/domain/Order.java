package com.uplus.order.domain;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
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

    private String planName;

    private String color;
}
