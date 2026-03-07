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

    const title = this.searchQuery.trim();

    // Navigate to all-properties with title query param
    this.router.navigate(['/all-properties'], {
      queryParams: title ? { title } : {},
    });
  }

  quickSearch(query: string): void {
    this.searchQuery = query;
    this.onSearch();
  }
}
