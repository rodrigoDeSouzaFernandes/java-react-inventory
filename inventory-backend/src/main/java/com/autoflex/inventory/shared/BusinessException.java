package com.autoflex.inventory.shared;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
