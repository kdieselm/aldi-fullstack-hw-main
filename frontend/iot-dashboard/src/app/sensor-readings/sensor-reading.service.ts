import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { SensorReading } from './sensor-reading';

@Injectable({ providedIn: 'root' })
export class SensorReadingService {
  private readonly http = inject(HttpClient);

  createReading(reading: SensorReading): Observable<SensorReading> {
    return this.http.post<SensorReading>('/api/sensor-readings', reading);
  }
}
