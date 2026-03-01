import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToFav } from './add-to-fav';

describe('AddToFav', () => {
  let component: AddToFav;
  let fixture: ComponentFixture<AddToFav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddToFav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
