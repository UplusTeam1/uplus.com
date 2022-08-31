package com.uplus.item.device.domain;

import com.uplus.item.discount.domain.Discount;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class Device implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String code;

    private Integer price;

    private Integer storage;

    private Integer weeklySale;

    @OneToMany(mappedBy = "device")
    private List<DeviceDetail> deviceDetails = new ArrayList<>();

    @OneToMany(mappedBy = "device")
    private List<Discount> discounts = new ArrayList<>();

}
