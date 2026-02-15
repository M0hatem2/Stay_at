import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerHeader } from './owner-header';

describe('OwnerHeader', () => {
  let component: OwnerHeader;
  let fixture: ComponentFixture<OwnerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
