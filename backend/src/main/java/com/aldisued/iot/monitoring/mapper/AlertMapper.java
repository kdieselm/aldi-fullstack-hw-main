package com.aldisued.iot.monitoring.mapper;

import com.aldisued.iot.monitoring.dto.AlertDto;
import com.aldisued.iot.monitoring.entity.Alert;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AlertMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "sensor", ignore = true)
  Alert toEntity(AlertDto alertDto);

  @Mapping(target = "sensorId", source = "sensor.id")
  AlertDto toDto(Alert alert);
}
