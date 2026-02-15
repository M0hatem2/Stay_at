import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasCard } from './areas-card';

describe('AreasCard', () => {
  let component: AreasCard;
  let fixture: ComponentFixture<AreasCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AreasCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreasCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
