import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedSpecifications } from './detailed-specifications';

describe('DetailedSpecifications', () => {
  let component: DetailedSpecifications;
  let fixture: ComponentFixture<DetailedSpecifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailedSpecifications]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedSpecifications);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
