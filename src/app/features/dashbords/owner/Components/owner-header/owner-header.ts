import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-header',
  imports: [],
  templateUrl: './owner-header.html',
  styleUrl: './owner-header.scss',
})
export class OwnerHeader {
  constructor(private router: Router) {}

  onAddProperty() {
    this.router.navigate(['/dashboard/owner/add-property']);
  }
}
