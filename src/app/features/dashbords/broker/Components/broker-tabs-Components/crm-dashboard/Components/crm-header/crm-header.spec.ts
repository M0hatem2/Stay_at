import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmHeader } from './crm-header';

describe('CrmHeader', () => {
  let component: CrmHeader;
  let fixture: ComponentFixture<CrmHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
