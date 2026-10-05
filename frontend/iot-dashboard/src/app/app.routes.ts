import { Routes } from '@angular/router';
import { Sensors } from './sensors/sensors';

export const routes: Routes = [
  { path: '', redirectTo: 'sensors', pathMatch: 'full' },
  { path: 'sensors', component: Sensors },
];
