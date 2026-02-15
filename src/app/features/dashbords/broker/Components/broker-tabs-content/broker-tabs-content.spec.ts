import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerTabsContent } from './broker-tabs-content';

describe('BrokerTabsContent', () => {
  let component: BrokerTabsContent;
  let fixture: ComponentFixture<BrokerTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerTabsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
