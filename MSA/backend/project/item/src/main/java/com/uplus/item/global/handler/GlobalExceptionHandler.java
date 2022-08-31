package com.uplus.item.global.handler;

import com.uplus.item.device.exception.DeviceAndPlanNotFoundException;
import com.uplus.item.device.exception.DeviceNotFoundException;
import com.uplus.item.plan.exception.PlanNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Throwable.class)
    protected ResponseEntity<?> handleThrowable(Throwable e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    @ExceptionHandler(RuntimeException.class)
    protected ResponseEntity<?> handleRuntimeException(RuntimeException e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
    }

    @ExceptionHandler(DeviceNotFoundException.class)
    protected ResponseEntity<?> handleDeviceNotFoundException(DeviceNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(DeviceAndPlanNotFoundException.class)
    protected ResponseEntity<?> handleDeviceAndPlanNotFoundException(DeviceAndPlanNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(PlanNotFoundException.class)
    protected ResponseEntity<?> handlePlanNotFoundException(PlanNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
