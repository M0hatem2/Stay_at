import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesAndMedia } from './images-and-media';

describe('ImagesAndMedia', () => {
  let component: ImagesAndMedia;
  let fixture: ComponentFixture<ImagesAndMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagesAndMedia]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagesAndMedia);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
