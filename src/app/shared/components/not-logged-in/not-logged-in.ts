import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-logged-in',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-logged-in.html',
  styleUrl: './not-logged-in.scss',
})
export class NotLoggedInComponent {
  @Input() isVisible: boolean = false;
  @Input() message: string = 'You need to be logged in to access this page';
  @Input() title: string = 'Login Required';
  @Input() showRegisterOption: boolean = true;
  @Output() close = new EventEmitter<void>();

  constructor(private router: Router) {}

  closePopup(): void {
    this.close.emit();
  }

  goToLogin(): void {
    this.closePopup();
    this.router.navigate(['/auth/login']);
  }
 
}
