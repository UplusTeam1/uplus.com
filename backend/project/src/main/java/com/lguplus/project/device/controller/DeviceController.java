package com.lguplus.project.device.controller;

import com.lguplus.project.device.service.DeviceServiceBySangWoo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import com.lguplus.project.device.service.DeviceServiceByDongWan;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    DeviceServiceByDongWan deviceServiceByDongWan;

    @Operation(summary = "Device List Test")
    @GetMapping
    public ResponseEntity<?> getAllDevices(@RequestParam("plan") String plan) {
        return new ResponseEntity<>(deviceServiceBySangWoo.getDevicesWithPlan(plan), HttpStatus.OK);
    }

    @Operation(summary = "Get Single Device Options By DeviceCode")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!")
    })
    @GetMapping("/{code}")
    public ResponseEntity<?> getDeviceOptions(@PathVariable String code) {
        return new ResponseEntity<>(deviceServiceByDongWan.getDeviceOptions(code), HttpStatus.OK);
    }

    @Operation(summary = "Get Single Device Prices By DeviceCode And Plan Name")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!")
    })
    @GetMapping("price/{code}/{planName}")
    public ResponseEntity<?> getDevicePrices(@PathVariable String code, @PathVariable String planName) {
        return new ResponseEntity<>(deviceServiceByDongWan.getDevicePrices(code, planName), HttpStatus.OK);
    }
}
