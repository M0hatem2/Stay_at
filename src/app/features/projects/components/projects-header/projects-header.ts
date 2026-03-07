import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-projects-header',
  imports: [FormsModule],
  templateUrl: './projects-header.html',
  styleUrl: './projects-header.scss',
})
export class ProjectsHeader {
  @Output() search = new EventEmitter<string>();
  @Output() clearSearch = new EventEmitter<void>();

  searchTerm = '';

  onSearch(event?: Event): void {
    if (event) event.preventDefault();
    this.search.emit(this.searchTerm.trim());
  }

  onClear(): void {
    this.searchTerm = '';
    this.clearSearch.emit();
  }
}
