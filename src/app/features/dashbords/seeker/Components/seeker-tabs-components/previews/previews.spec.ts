import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Previews } from './previews';

describe('Previews', () => {
  let component: Previews;
  let fixture: ComponentFixture<Previews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Previews]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Previews);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
