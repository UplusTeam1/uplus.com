package com.lguplus.project.global.handler;

import com.lguplus.project.device.exception.DeviceAndPlanNotFoundException;
import com.lguplus.project.device.exception.DeviceHaveNoStockException;
import com.lguplus.project.device.exception.DeviceNotFoundException;
import com.lguplus.project.order.exception.OrderNotFoundException;
import com.lguplus.project.plan.exception.PlanNotFoundException;
import com.lguplus.project.search.exception.ResultBodyNotFoundException;
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

    @ExceptionHandler(OrderNotFoundException.class)
    protected ResponseEntity<?> handleOrderNotFoundException(OrderNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(PlanNotFoundException.class)
    protected ResponseEntity<?> handlePlanNotFoundException(PlanNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler(DeviceHaveNoStockException.class)
    protected ResponseEntity<?> handleDeviceHaveNoStockException(DeviceHaveNoStockException e) {
        return ResponseEntity.status(HttpStatus.OK).body(e.getMessage());
    }

    @ExceptionHandler(ResultBodyNotFoundException.class)
    protected ResponseEntity<?> handleResultBodyNotFoundException(ResultBodyNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

}
