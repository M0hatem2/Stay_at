import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTabsNavigation } from './owner-tabs-navigation';

describe('OwnerTabsNavigation', () => {
  let component: OwnerTabsNavigation;
  let fixture: ComponentFixture<OwnerTabsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTabsNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerTabsNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
