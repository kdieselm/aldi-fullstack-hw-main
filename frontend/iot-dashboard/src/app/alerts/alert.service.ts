import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from './alert';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private readonly http = inject(HttpClient);

  getAlerts(): Observable<Alert[]> {
    return this.http.get<Alert[]>('/api/alerts');
  }
}
