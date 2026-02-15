import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTabsNavigation } from './crm-tabs-navigation';

describe('CrmTabsNavigation', () => {
  let component: CrmTabsNavigation;
  let fixture: ComponentFixture<CrmTabsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmTabsNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmTabsNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
