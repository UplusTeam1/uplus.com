package com.uplus.order.exception;

public class CreateOrderFailedException extends RuntimeException{
    public CreateOrderFailedException(String msg) {
        super(msg);
    }
}
