import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOurMission } from './about-our-mission';

describe('AboutOurMission', () => {
  let component: AboutOurMission;
  let fixture: ComponentFixture<AboutOurMission>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOurMission]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutOurMission);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
