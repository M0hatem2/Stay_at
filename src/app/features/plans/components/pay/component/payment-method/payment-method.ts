import { Component, EventEmitter, Output } from '@angular/core';
import { PaymentMethod } from '../../../../services/payment.service';

@Component({
  selector: 'app-payment-method',
  standalone: true,
  imports: [],
  templateUrl: './payment-method.html',
  styleUrl: './payment-method.scss',
})
export class PaymentMethodComponent {
  @Output() methodSelected = new EventEmitter<PaymentMethod>();

  selectMethod(method: PaymentMethod) {
    this.methodSelected.emit(method);
  }
}
