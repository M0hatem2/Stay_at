import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepData } from '../home-how-does-stay-at-work';

@Component({
  selector: 'app-step-card',
  imports: [CommonModule],
  templateUrl: './step-card.html',
  styleUrl: './step-card.scss',
  standalone: true,
})
export class StepCardComponent {
  @Input() step!: StepData;
  @Input() showConnector: boolean = true;
}
