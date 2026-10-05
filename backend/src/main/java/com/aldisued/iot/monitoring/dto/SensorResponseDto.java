package com.aldisued.iot.monitoring.dto;

import com.aldisued.iot.monitoring.entity.SensorType;

import java.util.UUID;

public record SensorResponseDto(
    UUID id,
    String name,
    SensorType type
) {
}
