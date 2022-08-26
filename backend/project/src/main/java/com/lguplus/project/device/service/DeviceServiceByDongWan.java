package com.lguplus.project.device.service;

import com.lguplus.project.device.domain.Device;
import com.lguplus.project.device.domain.DeviceDetail;
import com.lguplus.project.device.domain.payload.DeviceOptionsDetail;
import com.lguplus.project.device.domain.payload.GetDeviceOptionsResponse;
import com.lguplus.project.device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DeviceServiceByDongWan {

    @Autowired
    DeviceRepository deviceRepository;

    public GetDeviceOptionsResponse getDeviceOptions(String code) {
        Device findDevice = deviceRepository.findByCode(code);

        List<DeviceDetail> deviceDetails = findDevice.getDeviceDetails();
        List<DeviceOptionsDetail> detailPerColor = new ArrayList<>();

        for (DeviceDetail deviceDetail: deviceDetails) {
            detailPerColor.add(DeviceOptionsDetail.of(deviceDetail));
        }

        return GetDeviceOptionsResponse.of(findDevice, detailPerColor);
    }
}
