import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrmTabsContent } from './crm-tabs-content';

describe('CrmTabsContent', () => {
  let component: CrmTabsContent;
  let fixture: ComponentFixture<CrmTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrmTabsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrmTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
