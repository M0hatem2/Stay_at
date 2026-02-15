import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokerHeader } from './broker-header';

describe('BrokerHeader', () => {
  let component: BrokerHeader;
  let fixture: ComponentFixture<BrokerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
