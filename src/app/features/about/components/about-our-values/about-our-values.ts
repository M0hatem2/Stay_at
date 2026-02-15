import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  OurValuesCard,
  OurValue,
} from '../../../../shared/components/our-values-card/our-values-card';

@Component({
  selector: 'app-about-our-values',
  imports: [CommonModule, OurValuesCard],
  templateUrl: './about-our-values.html',
  styleUrl: './about-our-values.scss',
})
export class AboutOurValues {
  values: OurValue[] = [
    {
      icon: 'fa-solid fa-shield-halved',
      title: 'Transparency',
      description: 'Clear and accurate information for every property.',
      gradientClass: 'bg-gradient-to-br from-blue-500 to-blue-600',
    },
    {
      icon: 'fa-solid fa-wand-magic-sparkles',
      title: 'Innovation',
      description: 'Use of the latest artificial intelligence technologies.',
      gradientClass: 'bg-gradient-to-br from-purple-500 to-purple-600',
    },
    {
      icon: 'fa-solid fa-heart',
      title: 'Trust',
      description: 'Building long-term relationships with our customers.',
      gradientClass: 'bg-gradient-to-br from-red-500 to-red-600',
    },
    {
      icon: 'fa-solid fa-award',
      title: 'Professionalism',
      description: '24/7 customer service with the highest standards.',
      gradientClass: 'bg-gradient-to-br from-green-500 to-green-600',
    },
  ];
}
