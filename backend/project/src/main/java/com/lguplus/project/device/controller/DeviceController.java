package com.lguplus.project.device.controller;

import com.lguplus.project.device.service.DeviceServiceByDongWan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/device")
public class DeviceController {

    @Autowired
    DeviceServiceByDongWan deviceServiceByDongWan;

    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        return new ResponseEntity<>("Device List", HttpStatus.OK);
    }

    @GetMapping("/{code}")
    public ResponseEntity<?> getDeviceOptions(@PathVariable String code) {
        return new ResponseEntity<>(deviceServiceByDongWan.getDeviceOptions(code), HttpStatus.OK);
    }
}
