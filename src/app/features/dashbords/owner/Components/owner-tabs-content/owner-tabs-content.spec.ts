import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerTabsContent } from './owner-tabs-content';

describe('OwnerTabsContent', () => {
  let component: OwnerTabsContent;
  let fixture: ComponentFixture<OwnerTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerTabsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
