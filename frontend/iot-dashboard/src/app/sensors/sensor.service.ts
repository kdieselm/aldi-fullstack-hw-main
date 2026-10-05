import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Sensor } from './sensor';

@Injectable({ providedIn: 'root' })
export class SensorService {
  private readonly http = inject(HttpClient);

  getSensors(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>('/api/sensors');
  }
}
