package com.lguplus.project.order.domain;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.plan.domain.Plan;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "orders")
public class Order {

    @Id
    private String orderNumber;
    private String joinType;
    private LocalDateTime joinDate;
    private Integer monthlyFee;
    private String discountType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "code",
            name = "device_code")
    private Device device;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "name",
            name = "plan_name")
    private Plan plan;
}
