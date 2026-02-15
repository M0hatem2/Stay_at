import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFeaturedUnits } from './home-featured-units';

describe('HomeFeaturedUnits', () => {
  let component: HomeFeaturedUnits;
  let fixture: ComponentFixture<HomeFeaturedUnits>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeaturedUnits]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeFeaturedUnits);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
