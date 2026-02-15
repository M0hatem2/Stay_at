import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-acount-type',
  standalone: true,
  imports: [],
  templateUrl: './acount-type.html',
  styleUrl: './acount-type.scss',
})
export class AcountType {
  @Output() accountTypeSelected = new EventEmitter<string>();

  selectAccountType(type: string): void {
    this.accountTypeSelected.emit(type);
  }
}
