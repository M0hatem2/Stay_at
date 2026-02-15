import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutOurStory } from './about-our-story';

describe('AboutOurStory', () => {
  let component: AboutOurStory;
  let fixture: ComponentFixture<AboutOurStory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutOurStory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutOurStory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
