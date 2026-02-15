import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPopComponent } from './register-pop';

describe('RegisterPopComponent', () => {
  let component: RegisterPopComponent;
  let fixture: ComponentFixture<RegisterPopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
