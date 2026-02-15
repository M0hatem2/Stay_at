import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerTabsNavigation } from './seeker-tabs-navigation';

describe('SeekerTabsNavigation', () => {
  let component: SeekerTabsNavigation;
  let fixture: ComponentFixture<SeekerTabsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerTabsNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerTabsNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
