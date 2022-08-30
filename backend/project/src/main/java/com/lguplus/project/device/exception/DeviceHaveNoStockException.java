package com.lguplus.project.device.exception;

public class DeviceHaveNoStockException extends RuntimeException{
    public DeviceHaveNoStockException(String msg){
        super(msg);
    }
}
