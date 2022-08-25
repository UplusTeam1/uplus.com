package com.lguplus.project.device.domain;

import javax.persistence.*;

@Entity
public class DeviceDetail {

    @Id
    @GeneratedValue
    private Long id;

    private String color;

    @Column(length = 1000)
    private String picPaths;

    private Integer stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "code",
            name = "device_code")
    private Device device;
}
