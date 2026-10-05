import { Injectable, computed, inject, signal } from '@angular/core';
import { Sensor } from './sensor';
import { SensorService } from './sensor.service';

@Injectable({ providedIn: 'root' })
export class SensorStore {
  private readonly sensorService = inject(SensorService);

  private readonly sensorsState = signal<Sensor[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);
  private loaded = false;

  readonly sensors = this.sensorsState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();
  readonly sensorNames = computed(() =>
    Object.fromEntries(this.sensorsState().map((s) => [s.id, s.name])),
  );

  load(): void {
    if (this.loaded || this.loadingState()) {
      return;
    }

    this.loadingState.set(true);
    this.errorState.set(false);

    this.sensorService.getSensors().subscribe({
      next: (sensors) => {
        this.sensorsState.set(sensors);
        this.loaded = true;
        this.loadingState.set(false);
      },
      error: () => {
        this.errorState.set(true);
        this.loadingState.set(false);
      },
    });
  }
}
