import { Component, DestroyRef, inject } from '@angular/core';
import { SensorStore } from '../sensors/sensor.store';
import { AlertStore } from './alert.store';
import { AlertTable } from './alert-table';

@Component({
  selector: 'app-alerts',
  imports: [AlertTable],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  protected readonly alertStore = inject(AlertStore);
  protected readonly sensorStore = inject(SensorStore);

  constructor() {
    this.sensorStore.load();

    const polling = this.alertStore.startPolling();
    inject(DestroyRef).onDestroy(() => polling.unsubscribe());
  }
}
