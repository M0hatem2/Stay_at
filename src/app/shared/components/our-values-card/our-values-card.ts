import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface OurValue {
  icon: string;
  title: string;
  description: string;
  gradientClass: string;
}

@Component({
  selector: 'app-our-values-card',
  imports: [CommonModule],
  templateUrl: './our-values-card.html',
  styleUrl: './our-values-card.scss',
})
export class OurValuesCard {
  @Input() value!: OurValue;
}
