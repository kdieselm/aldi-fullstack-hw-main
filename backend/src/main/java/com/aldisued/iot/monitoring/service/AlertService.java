package com.aldisued.iot.monitoring.service;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import com.aldisued.iot.monitoring.entity.Sensor;
import com.aldisued.iot.monitoring.mapper.AlertMapper;
import com.aldisued.iot.monitoring.repository.AlertRepository;
import com.aldisued.iot.monitoring.repository.SensorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@Slf4j
public class AlertService {

  private static final String ALERTS_TOPIC = "alerts";

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

  @Transactional
  public Alert saveAlert(AlertDto alertDto) {
    log.debug("saveAlert > alertDto: {}", alertDto);

    Sensor sensor = getSensorById(alertDto.sensorId());
    Alert alert = alertMapper.toEntity(alertDto);
    alert.setSensor(sensor);

    // saveAndFlush before publishing, so Kafka message is not sent if a DB related error occurs.
    Alert savedAlert = alertRepository.saveAndFlush(alert);
    kafkaTemplate.send(ALERTS_TOPIC, alertDto);

    return savedAlert;
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

  private Sensor getSensorById(UUID sensorId) {
    log.debug("getSensorById > sensorId: {}", sensorId);

    return sensorRepository.findById(sensorId)
        .orElseThrow(() -> new EntityNotFoundException("Sensor not found: " + sensorId));
  }
}
