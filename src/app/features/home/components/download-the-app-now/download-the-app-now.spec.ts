import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadTheAppNow } from './download-the-app-now';

describe('DownloadTheAppNow', () => {
  let component: DownloadTheAppNow;
  let fixture: ComponentFixture<DownloadTheAppNow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadTheAppNow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadTheAppNow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
