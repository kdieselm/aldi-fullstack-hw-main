package com.aldisued.iot.monitoring.repository;

import com.aldisued.iot.monitoring.entity.SensorReading;
import com.aldisued.iot.monitoring.entity.SensorType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SensorReadingRepository extends JpaRepository<SensorReading, Long> {

  @Query("""
    SELECT AVG(sr.value) FROM SensorReading sr
    WHERE sr.sensor.type = :sensorType AND sr.timestamp BETWEEN :from AND :to
    """)
  Optional<Double> findAverageValueBySensorTypeInPeriod(
      @Param("sensorType") SensorType sensorType,
      @Param("from") LocalDateTime from,
      @Param("to") LocalDateTime to);

  @Query("""
    SELECT sr.value FROM SensorReading sr
    WHERE sr.sensor.type = :sensorType AND sr.timestamp BETWEEN :from AND :to
    ORDER BY sr.timestamp ASC
    """)
  List<Double> findValuesBySensorTypeInPeriodOrderByTimestamp(
      @Param("sensorType") SensorType sensorType,
      @Param("from") LocalDateTime from,
      @Param("to") LocalDateTime to
  );
}
