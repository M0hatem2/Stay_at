import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurTeamCard } from './our-team-card';

describe('OurTeamCard', () => {
  let component: OurTeamCard;
  let fixture: ComponentFixture<OurTeamCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurTeamCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurTeamCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
