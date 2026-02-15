import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../core/models/project.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-card',
  imports: [CommonModule],
  templateUrl: './projects-card.html',
  styleUrl: './projects-card.scss',
})
export class ProjectsCard {
  @Input() project!: Project;
  @Output() projectClick = new EventEmitter<Project>();

  onClick() {
    this.projectClick.emit(this.project);
  }
}
