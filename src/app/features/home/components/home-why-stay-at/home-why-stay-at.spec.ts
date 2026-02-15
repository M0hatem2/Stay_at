import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhyStayAt } from './home-why-stay-at';

describe('HomeWhyStayAt', () => {
  let component: HomeWhyStayAt;
  let fixture: ComponentFixture<HomeWhyStayAt>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWhyStayAt]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWhyStayAt);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
