import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertiesManagement } from './properties-management';

describe('PropertiesManagement', () => {
  let component: PropertiesManagement;
  let fixture: ComponentFixture<PropertiesManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertiesManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
