import { Component, inject } from '@angular/core';
import { SensorStore } from './sensor.store';
import { SensorTable } from './sensor-table';

@Component({
  selector: 'app-sensors',
  imports: [SensorTable],
  templateUrl: './sensors.html',
  styleUrl: './sensors.css',
})
export class Sensors {
  protected readonly sensorStore = inject(SensorStore);

  constructor() {
    this.sensorStore.load();
  }
}
