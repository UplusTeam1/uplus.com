package com.lguplus.project.device.domain;

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

    private Integer weeklySale;

    @OneToMany(mappedBy = "device")
    private List<DeviceDetail> deviceDetails = new ArrayList<>();

}
