import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Previews } from './previews';
import { SeekerViewingsService } from '../../../services/seeker-viewings.service';

describe('Previews', () => {
  let component: Previews;
  let fixture: ComponentFixture<Previews>;

  beforeEach(async () => {
    const seekerViewingsServiceMock = {
      getViewings: jasmine.createSpy('getViewings').and.returnValue(of({ viewings: [] })),
    };

    await TestBed.configureTestingModule({
      imports: [Previews],
      providers: [{ provide: SeekerViewingsService, useValue: seekerViewingsServiceMock }],
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
