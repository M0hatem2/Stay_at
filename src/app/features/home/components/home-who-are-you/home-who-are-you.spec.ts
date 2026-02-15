import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWhoAreYou } from './home-who-are-you';

describe('HomeWhoAreYou', () => {
  let component: HomeWhoAreYou;
  let fixture: ComponentFixture<HomeWhoAreYou>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeWhoAreYou]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWhoAreYou);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
