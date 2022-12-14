package com.lguplus.project.order.domain;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.plan.domain.Plan;
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

    @Enumerated(EnumType.STRING)
    private JoinType joinType;

    private LocalDate joinDate;
    private Integer monthlyFee;

    @Enumerated(EnumType.STRING)
    private DiscountType discountType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "code",
                name = "device_code")
    @JoinColumn(referencedColumnName = "name",
            name = "device_name")
    private Device device;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "name",
                name = "plan_name")
    private Plan plan;

    private String color;

    @Column(length = 1000)
    private String picPaths;
}
