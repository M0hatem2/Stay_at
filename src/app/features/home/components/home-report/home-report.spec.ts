import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeReport } from './home-report';

describe('HomeReport', () => {
  let component: HomeReport;
  let fixture: ComponentFixture<HomeReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
