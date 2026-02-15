import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerTabsNavigation } from './broker-tabs-navigation';

describe('BrokerTabsNavigation', () => {
  let component: BrokerTabsNavigation;
  let fixture: ComponentFixture<BrokerTabsNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerTabsNavigation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerTabsNavigation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
