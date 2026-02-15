import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTopAreas } from './home-top-areas';

describe('HomeTopAreas', () => {
  let component: HomeTopAreas;
  let fixture: ComponentFixture<HomeTopAreas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeTopAreas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTopAreas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
