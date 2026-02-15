import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsData } from './projects-data';

describe('ProjectsData', () => {
  let component: ProjectsData;
  let fixture: ComponentFixture<ProjectsData>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsData]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsData);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
