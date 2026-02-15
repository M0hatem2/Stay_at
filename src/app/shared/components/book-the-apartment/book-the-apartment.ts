import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-the-apartment',
  imports: [],
  templateUrl: './book-the-apartment.html',
  styleUrl: './book-the-apartment.scss',
})
export class BookTheApartment {
  @Output() closePopup = new EventEmitter<void>();

  onClose() {
    this.closePopup.emit();
  }
}
