import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOurCustomersSay } from './home-our-customers-say';

describe('HomeOurCustomersSay', () => {
  let component: HomeOurCustomersSay;
  let fixture: ComponentFixture<HomeOurCustomersSay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeOurCustomersSay]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOurCustomersSay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
