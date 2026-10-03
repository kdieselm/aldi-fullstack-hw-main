package com.aldisued.iot.monitoring.repository;

import com.aldisued.iot.monitoring.entity.Sensor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SensorRepository extends JpaRepository<Sensor, UUID> {
  boolean existsByName(String name);
}
