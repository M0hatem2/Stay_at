import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerTabsContent } from './seeker-tabs-content';

describe('SeekerTabsContent', () => {
  let component: SeekerTabsContent;
  let fixture: ComponentFixture<SeekerTabsContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerTabsContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerTabsContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
