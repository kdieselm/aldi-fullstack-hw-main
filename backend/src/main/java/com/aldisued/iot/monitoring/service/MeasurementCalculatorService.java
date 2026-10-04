package com.aldisued.iot.monitoring.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class MeasurementCalculatorService {

  private static final double MIN_DEVIATION = 0.0;
  private static final double MAX_DEVIATION = 1.0;

  public List<Double> filterByAverageDeviation(List<Double> values, Double deviation) {
    log.debug("filterByAverageDeviation > values: {}, deviation: {}", values, deviation);
    validateFilterByAverageDeviation(values, deviation);

    double avg = values.stream()
        .mapToDouble(Double::doubleValue)
        .average().orElse(0.0);

    double tolerance = deviation * Math.abs(avg);
    double lowerBound = avg - tolerance;
    double upperBound = avg + tolerance;

    return values.stream().filter(value -> value >= lowerBound && value <= upperBound).toList();
  }

  public List<Double> getMovingAverage(List<Double> data, int windowSize) {
    log.debug("getMovingAverage > data: {}, windowSize: {}", data, windowSize);
    validateMovingAverage(data, windowSize);

    List<Double> movingAverages = new ArrayList<>(data.size() - windowSize + 1);

    double sum = 0.0;
    for(int i = 0; i < data.size(); i++) {
      sum += data.get(i);
      if(i >= windowSize) {
        sum -= data.get(i - windowSize);
      }
      if(i >= windowSize - 1) {
        movingAverages.add(sum / windowSize);
      }
    }

    return movingAverages;
  }

  private static void validateMovingAverage(List<Double> data, int windowSize) {
    if(data == null) {
      throw new IllegalArgumentException("Data cannot be null");
    }
    if(windowSize <= 0) {
      throw new IllegalArgumentException("Window size must be a positive integer");
    }
    if(windowSize > data.size()) {
      throw new IllegalArgumentException("Window size cannot be greater than the number of values: " + data.size());
    }
  }

  private static void validateFilterByAverageDeviation(List<Double> values, Double deviation) {
    if(values == null || deviation == null) {
      throw new IllegalArgumentException("Values and deviation cannot be null");
    }
    if(!(deviation >= MIN_DEVIATION && deviation <= MAX_DEVIATION)) {
      throw new IllegalArgumentException("Deviation must be between " + MIN_DEVIATION + " and " + MAX_DEVIATION);
    }
  }
}
