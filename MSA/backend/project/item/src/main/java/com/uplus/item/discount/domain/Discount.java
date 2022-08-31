package com.uplus.item.discount.domain;

import com.uplus.item.device.domain.Device;
import com.uplus.item.plan.domain.Plan;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class Discount implements Serializable {

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
