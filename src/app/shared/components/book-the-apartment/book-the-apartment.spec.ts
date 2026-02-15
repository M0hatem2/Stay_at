import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTheApartment } from './book-the-apartment';

describe('BookTheApartment', () => {
  let component: BookTheApartment;
  let fixture: ComponentFixture<BookTheApartment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookTheApartment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookTheApartment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
