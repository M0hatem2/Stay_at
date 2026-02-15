import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeHowDoesStayAtWork } from './home-how-does-stay-at-work';

describe('HomeHowDoesStayAtWork', () => {
  let component: HomeHowDoesStayAtWork;
  let fixture: ComponentFixture<HomeHowDoesStayAtWork>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeHowDoesStayAtWork]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeHowDoesStayAtWork);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
