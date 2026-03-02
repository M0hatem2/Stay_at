import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouDeveloper } from './you-developer';

describe('YouDeveloper', () => {
  let component: YouDeveloper;
  let fixture: ComponentFixture<YouDeveloper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YouDeveloper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YouDeveloper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
