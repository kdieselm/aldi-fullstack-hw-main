package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.dto.AlertResponseDto;
import com.aldisued.iot.monitoring.mapper.AlertMapper;
import com.aldisued.iot.monitoring.service.AlertService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/alerts")
public class AlertController {

  private final AlertService alertService;
  private final AlertMapper alertMapper;

  public AlertController(AlertService alertService, AlertMapper alertMapper) {
    this.alertService = alertService;
    this.alertMapper = alertMapper;
  }

  @GetMapping
  public List<AlertResponseDto> getAllAlerts() {
    return alertService.findAllAlerts();
  }

  @PostMapping
  public AlertDto saveAlert(@RequestBody @Valid AlertDto alertDto) {
    return alertMapper.toDto(alertService.saveAlert(alertDto));
  }

  @GetMapping("/latest")
  public AlertDto getLatestAlert(@RequestParam UUID sensorId) {
    return alertService.findLastAlertBySensorId(sensorId);
  }
}
