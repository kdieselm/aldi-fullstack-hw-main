import { Routes } from '@angular/router';
import { Sensors } from './sensors/sensors';
import { SensorReadings } from './sensor-readings/sensor-readings';

export const routes: Routes = [
  { path: '', redirectTo: 'sensors', pathMatch: 'full' },
  { path: 'sensors', component: Sensors },
  { path: 'sensor-readings', component: SensorReadings },
];
