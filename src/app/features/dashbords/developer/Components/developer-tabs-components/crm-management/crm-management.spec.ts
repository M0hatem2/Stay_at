import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmManagement } from './crm-management';

describe('CrmManagement', () => {
  let component: CrmManagement;
  let fixture: ComponentFixture<CrmManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
