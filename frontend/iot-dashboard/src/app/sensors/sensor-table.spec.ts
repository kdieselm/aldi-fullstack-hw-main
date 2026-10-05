import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sensor } from './sensor';
import { SensorTable } from './sensor-table';

describe('SensorTable', () => {
  let fixture: ComponentFixture<SensorTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SensorTable],
    }).compileComponents();

    fixture = TestBed.createComponent(SensorTable);
  });

  function render(sensors: Sensor[]): HTMLElement {
    fixture.componentRef.setInput('sensors', sensors);
    fixture.detectChanges();
    return fixture.nativeElement;
  }

  it('should render a row for each sensor', () => {
    const element = render([
      { id: '1', name: 'Freezer', type: 'TEMPERATURE' },
      { id: '2', name: 'Warehouse', type: 'HUMIDITY' },
    ]);

    const rows = element.querySelectorAll('tbody tr');
    expect(rows.length).toBe(2);
    expect(rows[0].textContent).toContain('Freezer');
    expect(rows[0].textContent).toContain('TEMPERATURE');
    expect(rows[1].textContent).toContain('Warehouse');
    expect(rows[1].textContent).toContain('HUMIDITY');
  });

  it('should show an empty message when there are no sensors', () => {
    const element = render([]);

    expect(element.querySelector('tbody')?.textContent).toContain('No sensors found.');
  });
});
