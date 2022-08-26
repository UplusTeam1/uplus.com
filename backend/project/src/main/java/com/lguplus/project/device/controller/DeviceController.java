package com.lguplus.project.device.controller;

import com.lguplus.project.device.service.DeviceServiceBySangWoo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/device")
public class DeviceController {

    private final DeviceServiceBySangWoo deviceServiceBySangWoo;

    @GetMapping("/{id}")
    public ResponseEntity<?> getDevice(@PathVariable Long id) {
        return new ResponseEntity<>(id + "조회", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllDevices(@RequestParam("plan") String plan) {
        return new ResponseEntity<>(deviceServiceBySangWoo.getDevicesWithPlan(plan), HttpStatus.OK);
    }
}
