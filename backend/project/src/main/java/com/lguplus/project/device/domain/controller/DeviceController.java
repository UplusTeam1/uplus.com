package com.lguplus.project.device.domain.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/device")
public class DeviceController {

    @GetMapping("/{id}")
    public ResponseEntity<?> getDevice(@PathVariable Long id) {
        return new ResponseEntity<>(id + "조회", HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<?> getAllDevices() {
        return new ResponseEntity<>("Device List", HttpStatus.OK);
    }
}
