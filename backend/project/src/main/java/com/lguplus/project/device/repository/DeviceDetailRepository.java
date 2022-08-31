package com.lguplus.project.device.repository;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.domain.DeviceDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceDetailRepository extends JpaRepository<DeviceDetail, Long> {

    Optional<DeviceDetail> findByDeviceAndColor(Device device, String color);
}
