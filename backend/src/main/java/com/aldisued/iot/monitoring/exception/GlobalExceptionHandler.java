package com.aldisued.iot.monitoring.exception;

import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@ControllerAdvice
@Slf4j
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(EntityNotFoundException.class)
  public ResponseEntity<Map<String, Object>> handleNotFoundException(EntityNotFoundException ex) {
    log.warn("Not found exception occurred: {}", ex.getMessage());
    return new ResponseEntity<>(getErrorsMap(ex.getMessage(), HttpStatus.NOT_FOUND), new HttpHeaders(), HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(SensorAlreadyExistsException.class)
  public ResponseEntity<Map<String, Object>> handleConflict(SensorAlreadyExistsException ex) {
    log.warn("Conflict occurred: {}", ex.getMessage());
    return new ResponseEntity<>(getErrorsMap(ex.getMessage(), HttpStatus.CONFLICT), new HttpHeaders(), HttpStatus.CONFLICT);
  }

  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Map<String, Object>> handleDataIntegrityViolation(DataIntegrityViolationException ex) {
    log.warn("Data integrity violation occurred: {}", ex.getMostSpecificCause().getMessage());
    return new ResponseEntity<>(getErrorsMap("Resource conflicts with existing data.", HttpStatus.CONFLICT), new HttpHeaders(), HttpStatus.CONFLICT);
  }

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(
      MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    log.warn("Validation failed: {}", ex.getMessage());

    String errors = ex.getBindingResult().getFieldErrors().stream()
        .map(e -> e.getField() + ": " + e.getDefaultMessage())
        .collect(Collectors.joining(", "));

    return new ResponseEntity<>(getErrorsMap(errors, HttpStatus.BAD_REQUEST), headers, HttpStatus.BAD_REQUEST);
  }

  private Map<String, Object> getErrorsMap(String errors, HttpStatus status) {
    Map<String, Object> errorResponse = new HashMap<>();
    errorResponse.put("errors", errors);
    errorResponse.put("code", status.value());

    return errorResponse;
  }
}
