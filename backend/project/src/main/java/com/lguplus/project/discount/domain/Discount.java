package com.lguplus.project.discount.domain;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.plan.domain.Plan;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Discount {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "name",
            name = "plan_name")
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "code",
            name = "device_code")
    private Device device;

    private int deviceDiscount;
}
