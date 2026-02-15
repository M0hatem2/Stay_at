import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiriesMessages } from './inquiries-messages';

describe('InquiriesMessages', () => {
  let component: InquiriesMessages;
  let fixture: ComponentFixture<InquiriesMessages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiriesMessages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiriesMessages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
