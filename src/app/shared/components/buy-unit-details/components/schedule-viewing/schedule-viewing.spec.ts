import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewing } from './schedule-viewing';

describe('ScheduleViewing', () => {
  let component: ScheduleViewing;
  let fixture: ComponentFixture<ScheduleViewing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleViewing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleViewing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
