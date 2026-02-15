import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperTabsContent } from './developer-tabs-content';

describe('DeveloperTabsContent', () => {
  let component: DeveloperTabsContent;
  let fixture: ComponentFixture<DeveloperTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperTabsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
