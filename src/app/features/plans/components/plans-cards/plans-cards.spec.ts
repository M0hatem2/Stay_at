import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlansCards } from './plans-cards';

describe('PlansCards', () => {
  let component: PlansCards;
  let fixture: ComponentFixture<PlansCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlansCards]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlansCards);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
