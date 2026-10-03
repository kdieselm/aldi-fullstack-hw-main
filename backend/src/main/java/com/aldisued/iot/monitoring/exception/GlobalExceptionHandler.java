package com.aldisued.iot.monitoring.exception;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<Map<String, Object>> handleNotFoundException(EntityNotFoundException ex) {
    log.warn("Not found exception occurred: {}", ex.getMessage());
    return new ResponseEntity<>(getErrorsMap(ex.getMessage(), HttpStatus.NOT_FOUND), new HttpHeaders(), HttpStatus.NOT_FOUND);
  }

  private Map<String, Object> getErrorsMap(String errors, HttpStatus status) {
    Map<String, Object> errorResponse = new HashMap<>();
    errorResponse.put("errors", errors);
    errorResponse.put("code", status.value());

    return errorResponse;
  }
}
