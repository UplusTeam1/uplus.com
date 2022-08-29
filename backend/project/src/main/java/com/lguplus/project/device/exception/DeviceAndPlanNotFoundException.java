package com.lguplus.project.device.exception;

public class DeviceAndPlanNotFoundException extends RuntimeException{
    public DeviceAndPlanNotFoundException(String msg) {
        super(msg);
    }
}