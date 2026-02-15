import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOurTeam } from './about-our-team';

describe('AboutOurTeam', () => {
  let component: AboutOurTeam;
  let fixture: ComponentFixture<AboutOurTeam>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOurTeam]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutOurTeam);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
