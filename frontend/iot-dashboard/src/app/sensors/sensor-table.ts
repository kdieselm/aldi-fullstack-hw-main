import { Component, input } from '@angular/core';
import { Sensor } from './sensor';

@Component({
  selector: 'app-sensor-table',
  templateUrl: './sensor-table.html',
  styleUrl: './sensor-table.css',
})
export class SensorTable {
  readonly sensors = input.required<Sensor[]>();
}
