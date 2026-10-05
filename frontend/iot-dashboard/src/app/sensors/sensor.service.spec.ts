import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Sensor } from './sensor';
import { SensorService } from './sensor.service';

describe('SensorService', () => {
  let service: SensorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SensorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch sensors from the API', () => {
    const sensors: Sensor[] = [
      { id: '1', name: 'Freezer', type: 'TEMPERATURE' },
      { id: '2', name: 'Warehouse', type: 'HUMIDITY' },
    ];
    let result: Sensor[] | undefined;

    service.getSensors().subscribe((data) => (result = data));

    const req = httpMock.expectOne('/api/sensors');
    expect(req.request.method).toBe('GET');
    req.flush(sensors);

    expect(result).toEqual(sensors);
  });
});
