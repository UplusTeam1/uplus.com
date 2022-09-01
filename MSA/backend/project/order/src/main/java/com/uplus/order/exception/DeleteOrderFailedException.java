package com.uplus.order.exception;

public class DeleteOrderFailedException extends RuntimeException{
    public DeleteOrderFailedException(String msg) {
        super(msg);
    }
}
