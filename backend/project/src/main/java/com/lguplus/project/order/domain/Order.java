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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String join_type;
    private LocalDateTime join_date;
    private Integer monthly_fee;
    private String discount_type;

    //device_id
    @ManyToOne
    @JoinColumn(name = "device_id")
    private Device device;

    //plan_id
    @ManyToOne
    @JoinColumn(name = "plan_id")
    private Plan plan;
}
