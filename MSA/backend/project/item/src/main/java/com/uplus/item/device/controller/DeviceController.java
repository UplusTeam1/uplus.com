package com.uplus.item.device.controller;

import com.uplus.item.device.service.DeviceServiceByDongWan;
import com.uplus.item.device.service.DeviceServiceBySangWoo;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@CrossOrigin("*")
@RequestMapping("api/device")
public class DeviceController {

    private final DeviceServiceBySangWoo deviceServiceBySangWoo;
    private final DeviceServiceByDongWan deviceServiceByDongWan;

    @Operation(summary = "Get Device List With Plan Name")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK")
    })
    @GetMapping
    public ResponseEntity<?> getAllDevices(@RequestParam("plan") String plan) {
        return new ResponseEntity<>(deviceServiceBySangWoo.getDevicesWithPlan(plan), HttpStatus.OK);
    }

    @Operation(summary = "Get Single Device Options By DeviceCode")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Device Not Found")
    })
    @GetMapping("/{code}")
    public ResponseEntity<?> getDeviceOptions(@PathVariable String code) {
        return new ResponseEntity<>(deviceServiceByDongWan.getDeviceOptions(code), HttpStatus.OK);
    }

    @Operation(summary = "Get Single Device Prices By DeviceCode And Plan Name")
    @ApiResponses({
            @ApiResponse(code = 200, message = "OK!"),
            @ApiResponse(code = 404, message = "Exception : Device And PlanName Not Found")
    })
    @GetMapping("price/{code}/{planName}")
    public ResponseEntity<?> getDevicePrices(@PathVariable String code, @PathVariable String planName) {
        return new ResponseEntity<>(deviceServiceByDongWan.getDevicePrices(code, planName), HttpStatus.OK);
    }
}
