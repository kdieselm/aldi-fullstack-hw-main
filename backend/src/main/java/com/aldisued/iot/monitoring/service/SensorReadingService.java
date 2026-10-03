package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.SensorReadingDto;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.mapper.SensorReadingMapper;
import com.aldisued.iot.monitoring.repository.SensorReadingRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
public class SensorReadingService {

  private final SensorReadingRepository sensorReadingRepository;
  private final SensorRepository sensorRepository;
  private final SensorReadingMapper sensorReadingMapper;

  public SensorReadingService(SensorReadingRepository sensorReadingRepository,
                              SensorRepository sensorRepository, SensorReadingMapper sensorReadingMapper) {
    this.sensorReadingRepository = sensorReadingRepository;
    this.sensorRepository = sensorRepository;
    this.sensorReadingMapper = sensorReadingMapper;
  }

  @Transactional
  public SensorReading saveSensorReading(SensorReadingDto sensorReadingDto) {
    log.debug("saveSensorReading > sensorReadingDto: {}", sensorReadingDto);

    Sensor sensor = getSensorById(sensorReadingDto.sensorId());
    SensorReading sensorReading = sensorReadingMapper.toEntity(sensorReadingDto);
    sensorReading.setSensor(sensor);

    return sensorReadingRepository.save(sensorReading);
  }

  private Sensor getSensorById(UUID sensorId) {
    log.debug("getSensorById > sensorId: {}", sensorId);

    return sensorRepository.findById(sensorId)
        .orElseThrow(() -> new EntityNotFoundException("Sensor not found: " + sensorId));
  }
}
