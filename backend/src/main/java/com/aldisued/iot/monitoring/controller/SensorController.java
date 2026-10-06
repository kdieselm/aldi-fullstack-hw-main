package com.aldisued.iot.monitoring.controller;

import com.aldisued.iot.monitoring.dto.SensorDto;
import com.aldisued.iot.monitoring.dto.SensorResponseDto;
import com.aldisued.iot.monitoring.mapper.SensorMapper;
import com.aldisued.iot.monitoring.service.SensorService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/sensors")
public class SensorController {

  private final SensorService sensorService;
  private final SensorMapper sensorMapper;

  public SensorController(SensorService sensorService, SensorMapper sensorMapper) {
    this.sensorService = sensorService;
    this.sensorMapper = sensorMapper;
  }

  @GetMapping
  public List<SensorResponseDto> getAllSensors() {
    return sensorService.findAllSensors();
  }

  @PostMapping
  public SensorResponseDto saveSensor(@RequestBody @Valid SensorDto sensorDto) {
    return sensorMapper.toResponseDto(sensorService.saveSensor(sensorDto));
  }
}
