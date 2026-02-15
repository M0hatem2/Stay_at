import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekerHeader } from './seeker-header';

describe('SeekerHeader', () => {
  let component: SeekerHeader;
  let fixture: ComponentFixture<SeekerHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeekerHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeekerHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
