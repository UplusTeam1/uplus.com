package com.lguplus.project.device.domain;

import com.lguplus.project.discount.domain.Discount;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String code;

    private Integer price;

    private Integer storage;

    @OneToMany(mappedBy = "device")
    private List<DeviceDetail> deviceDetails = new ArrayList<>();

    @OneToMany(mappedBy = "device")
    private List<Discount> discounts = new ArrayList<>();

}
