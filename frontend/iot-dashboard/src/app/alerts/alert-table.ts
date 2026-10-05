import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Alert } from './alert';

@Component({
  selector: 'app-alert-table',
  imports: [DatePipe],
  templateUrl: './alert-table.html',
  styleUrl: './alert-table.css',
})
export class AlertTable {
  readonly alerts = input.required<Alert[]>();
  readonly sensorNames = input<Record<string, string>>({});

  protected sensorName(sensorId: string): string {
    return this.sensorNames()[sensorId] ?? sensorId;
  }
}
