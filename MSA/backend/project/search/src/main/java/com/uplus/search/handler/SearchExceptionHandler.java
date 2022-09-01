package com.uplus.search.handler;

import com.uplus.search.exception.ResultBodyNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class SearchExceptionHandler {

    @ExceptionHandler(ResultBodyNotFoundException.class)
    protected ResponseEntity<?> handleResultBodyNotFoundException(ResultBodyNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
