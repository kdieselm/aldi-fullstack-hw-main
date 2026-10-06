import { Injectable, computed, inject, signal } from '@angular/core';
import { EMPTY, Subscription, catchError, switchMap, timer } from 'rxjs';
import { Alert } from './alert';
import { AlertService } from './alert.service';

const POLL_INTERVAL_MS = 5000;

@Injectable({ providedIn: 'root' })
export class AlertStore {
  private readonly alertService = inject(AlertService);

  private readonly alertsState = signal<Alert[]>([]);
  private readonly loadingState = signal(false);
  private readonly errorState = signal(false);

  readonly alerts = computed(() =>
    [...this.alertsState()].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    ),
  );
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  startPolling(): Subscription {
    this.loadingState.set(this.alertsState().length === 0);

    return timer(0, POLL_INTERVAL_MS)
      .pipe(
        switchMap(() =>
          this.alertService.getAlerts().pipe(
            catchError(() => {
              this.errorState.set(true);
              this.loadingState.set(false);
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe((alerts) => {
        this.alertsState.set(alerts);
        this.errorState.set(false);
        this.loadingState.set(false);
      });
  }
}
