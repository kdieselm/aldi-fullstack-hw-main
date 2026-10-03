package com.aldisued.iot.monitoring.mapper;

import com.aldisued.iot.monitoring.dto.SensorReadingDto;
import com.aldisued.iot.monitoring.entity.SensorReading;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface SensorReadingMapper {
  @Mapping(target = "id", ignore = true)
  @Mapping(target = "sensor", ignore = true)
  SensorReading toEntity(SensorReadingDto sensorReadingDto);

  @Mapping(target = "sensorId", source = "sensor.id")
  SensorReadingDto toDto(SensorReading sensorReading);
}
