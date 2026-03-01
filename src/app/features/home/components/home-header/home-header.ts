import { Component } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-header',
  imports: [RouterLink, FormsModule],
  templateUrl: './home-header.html',
  styleUrl: './home-header.scss',
})
export class HomeHeader {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    
    // Navigate to all-properties with search query
    this.router.navigate(['/all-properties'], {
      queryParams: { search: this.searchQuery }
    });
  }

  quickSearch(query: string): void {
    this.searchQuery = query;
    this.onSearch();
  }
}
