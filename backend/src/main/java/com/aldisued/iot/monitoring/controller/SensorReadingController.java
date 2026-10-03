package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.SensorReadingDto;
import com.aldisued.iot.monitoring.mapper.SensorReadingMapper;
import com.aldisued.iot.monitoring.service.SensorReadingService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/sensor-readings")
public class SensorReadingController {

  private final SensorReadingService sensorReadingService;
  private final SensorReadingMapper sensorReadingMapper;

  public SensorReadingController(SensorReadingService sensorReadingService, SensorReadingMapper sensorReadingMapper) {
    this.sensorReadingService = sensorReadingService;
    this.sensorReadingMapper = sensorReadingMapper;
  }

  @PostMapping
  public SensorReadingDto saveSensorReading(@RequestBody @Valid SensorReadingDto sensorReadingDto) {
    return sensorReadingMapper.toDto(sensorReadingService.saveSensorReading(sensorReadingDto));
  }
}
