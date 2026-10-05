import { Component, inject, signal } from '@angular/core';
import { Sensor } from './sensor';
import { SensorService } from './sensor.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.html',
  styleUrl: './sensors.css',
})
export class Sensors {
  private readonly sensorService = inject(SensorService);

  protected readonly sensors = signal<Sensor[]>([]);
  protected readonly error = signal(false);

  constructor() {
    this.sensorService.getSensors().subscribe({
      next: (sensors) => this.sensors.set(sensors),
      error: () => this.error.set(true),
    });
  }
}
