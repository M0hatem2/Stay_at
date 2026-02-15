import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsManagement } from './projects-management';

describe('ProjectsManagement', () => {
  let component: ProjectsManagement;
  let fixture: ComponentFixture<ProjectsManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectsManagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
