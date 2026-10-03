package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.SensorDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.exception.SensorAlreadyExistsException;
import com.aldisued.iot.monitoring.mapper.SensorMapper;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class SensorService {

  private final SensorRepository sensorRepository;
  private final SensorMapper sensorMapper;

  public SensorService(SensorRepository sensorRepository, SensorMapper sensorMapper) {
    this.sensorRepository = sensorRepository;
    this.sensorMapper = sensorMapper;
  }

  public Sensor saveSensor(SensorDto sensor) {
    log.debug("saveSensor > sensorDto: {}", sensor);

    if(sensorRepository.existsByName(sensor.name())) {
      throw new SensorAlreadyExistsException(sensor.name());
    }

    return sensorRepository.save(sensorMapper.toEntity(sensor));
  }
}
