package com.aldisued.iot.monitoring.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.UUID;

public record AlertDto(
    @NotNull(message = "Sensor ID is required!")
    UUID sensorId,

    @NotBlank(message = "Alert message is required!")
    String message,

    @NotNull(message = "Alert timestamp is required!")
    LocalDateTime timestamp
) {
}
