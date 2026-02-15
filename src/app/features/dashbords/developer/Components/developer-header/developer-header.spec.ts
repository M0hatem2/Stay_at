import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperHeader } from './developer-header';

describe('DeveloperHeader', () => {
  let component: DeveloperHeader;
  let fixture: ComponentFixture<DeveloperHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeveloperHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
