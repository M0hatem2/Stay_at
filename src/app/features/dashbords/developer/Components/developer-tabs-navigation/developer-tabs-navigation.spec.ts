import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTabsNavigation } from './developer-tabs-navigation';

describe('DeveloperTabsNavigation', () => {
  let component: DeveloperTabsNavigation;
  let fixture: ComponentFixture<DeveloperTabsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperTabsNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperTabsNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
