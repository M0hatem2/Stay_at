import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsCard } from './units-card';

describe('UnitsCard', () => {
  let component: UnitsCard;
  let fixture: ComponentFixture<UnitsCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnitsCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitsCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
