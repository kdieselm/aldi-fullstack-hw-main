package com.aldisued.iot.monitoring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MeasurementCalculatorService {

  private static final double MIN_DEVIATION = 0.0;
  private static final double MAX_DEVIATION = 1.0;

  public List<Double> filterByAverageDeviation(List<Double> values, Double deviation) {
    log.debug("filterByAverageDeviation > values: {}, deviation: {}", values, deviation);

    if(values == null || deviation == null) {
      throw new IllegalArgumentException("Values and deviation cannot be null");
    }
    if(!(deviation >= MIN_DEVIATION && deviation <= MAX_DEVIATION)) {
      throw new IllegalArgumentException("Deviation must be between " + MIN_DEVIATION + " and " + MAX_DEVIATION);
    }

    double avg = values.stream()
        .mapToDouble(Double::doubleValue)
        .average().orElse(0.0);

    double tolerance = deviation * Math.abs(avg);
    double lowerBound = avg - tolerance;
    double upperBound = avg + tolerance;

    return values.stream().filter(value -> value >= lowerBound && value <= upperBound).toList();
  }

  public List<Double> getMovingAverage(List<Double> data, int windowSize) {
    // TODO: Task 10
    return List.of();
  }

}
