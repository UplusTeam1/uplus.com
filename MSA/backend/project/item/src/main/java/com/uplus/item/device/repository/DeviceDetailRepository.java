package com.uplus.item.device.repository;

import com.uplus.item.device.domain.DeviceDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DeviceDetailRepository extends JpaRepository<DeviceDetail, Long> {

    Optional<DeviceDetail> findByColorAndDeviceCode(String color, String deviceCode);
}
