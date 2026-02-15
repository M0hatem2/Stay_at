import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDeals } from './my-deals';

describe('MyDeals', () => {
  let component: MyDeals;
  let fixture: ComponentFixture<MyDeals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyDeals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDeals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
