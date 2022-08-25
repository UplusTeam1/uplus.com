package com.lguplus.project.device.domain;

import javax.persistence.*;

@Entity
public class DeviceDetail {

    @Id
    @GeneratedValue
    private Long id;

    private String colors;

    @Column(length = 1000)
    private String picPaths;

    private Integer stock;

    @ManyToOne
    @JoinColumn(name = "id")
    private Device device;
}
