package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.mapper.AlertMapper;
import com.aldisued.iot.monitoring.repository.AlertRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@Slf4j
public class AlertService {

  private final AlertRepository alertRepository;
  private final SensorRepository sensorRepository;
  private final KafkaTemplate<String, AlertDto> kafkaTemplate;
  private final AlertMapper alertMapper;

  public AlertService(AlertRepository alertRepository, SensorRepository sensorRepository,
      KafkaTemplate<String, AlertDto> kafkaTemplate, AlertMapper alertMapper) {
    this.alertRepository = alertRepository;
    this.sensorRepository = sensorRepository;
    this.kafkaTemplate = kafkaTemplate;
    this.alertMapper = alertMapper;
  }

  public Alert saveAlert(AlertDto alertDto) {
    // TODO: Task 6
    return null;
  }

  public AlertDto findLastAlertBySensorId(UUID sensorId) {
    log.debug("findLastAlertBySensorId > sensorId: {}", sensorId);

    if(!sensorRepository.existsById(sensorId)) {
      throw new EntityNotFoundException("Sensor not found: " + sensorId);
    }

    Alert lastAlert = alertRepository.findTopBySensorIdOrderByTimestampDesc(sensorId)
        .orElseThrow(() -> new EntityNotFoundException("Alert not found for sensor with id: " + sensorId));

    return alertMapper.toDto(lastAlert);
  }
}
