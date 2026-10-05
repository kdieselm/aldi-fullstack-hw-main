import { Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EMPTY, catchError, switchMap, timer } from 'rxjs';
import { SensorService } from '../sensors/sensor.service';
import { Alert } from './alert';
import { AlertService } from './alert.service';

const POLL_INTERVAL_MS = 5000;

@Component({
  selector: 'app-alerts',
  imports: [DatePipe],
  templateUrl: './alerts.html',
  styleUrl: './alerts.css',
})
export class Alerts {
  private readonly alertService = inject(AlertService);
  private readonly sensorService = inject(SensorService);

  protected readonly alerts = signal<Alert[]>([]);
  protected readonly sensorNames = signal<Record<string, string>>({});
  protected readonly error = signal(false);

  constructor() {
    this.sensorService.getSensors().subscribe({
      next: (sensors) =>
        this.sensorNames.set(Object.fromEntries(sensors.map((s) => [s.id, s.name]))),
    });

    timer(0, POLL_INTERVAL_MS)
      .pipe(
        switchMap(() =>
          this.alertService.getAlerts().pipe(
            catchError(() => {
              this.error.set(true);
              return EMPTY;
            }),
          ),
        ),
        takeUntilDestroyed(),
      )
      .subscribe((alerts) => {
        this.error.set(false);
        this.alerts.set(alerts);
      });
  }

  protected sensorName(sensorId: string): string {
    return this.sensorNames()[sensorId] ?? sensorId;
  }
}
