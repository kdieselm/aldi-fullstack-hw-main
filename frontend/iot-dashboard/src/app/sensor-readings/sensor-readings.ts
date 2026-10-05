import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SensorStore } from '../sensors/sensor.store';
import { SensorReadingService } from './sensor-reading.service';

@Component({
  selector: 'app-sensor-readings',
  imports: [ReactiveFormsModule],
  templateUrl: './sensor-readings.html',
  styleUrl: './sensor-readings.css',
})
export class SensorReadings {
  protected readonly sensorStore = inject(SensorStore);
  private readonly sensorReadingService = inject(SensorReadingService);
  private readonly formBuilder = inject(FormBuilder);

  protected readonly submitting = signal(false);
  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  protected readonly form = this.formBuilder.group({
    sensorId: ['', Validators.required],
    value: [null as number | null, Validators.required],
    timestamp: ['', Validators.required],
  });

  constructor() {
    this.sensorStore.load();
  }

  protected submit(): void {
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { sensorId, value, timestamp } = this.form.getRawValue();
    this.submitting.set(true);

    this.sensorReadingService
      .createReading({ sensorId: sensorId!, value: value!, timestamp: timestamp! })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.successMessage.set('Sensor reading saved.');
          this.form.reset({ sensorId, value: null, timestamp: '' });
        },
        error: (err) => {
          this.submitting.set(false);
          this.errorMessage.set(err.error?.errors ?? 'Could not save sensor reading.');
        },
      });
  }

  protected showRequired(field: 'sensorId' | 'value' | 'timestamp'): boolean {
    const control = this.form.controls[field];
    return control.touched && control.hasError('required');
  }
}
