package com.lguplus.project.device.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DeviceDetail {

    @Id
    @GeneratedValue
    private Long id;

    private String color;

    private String rgb;

    @Column(length = 1000)
    private String picPaths;

    private Integer stock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "code",
            name = "device_code")
    private Device device;
}
