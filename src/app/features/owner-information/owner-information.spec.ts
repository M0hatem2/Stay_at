import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerInformation } from './owner-information';

describe('OwnerInformation', () => {
  let component: OwnerInformation;
  let fixture: ComponentFixture<OwnerInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
