import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepCardComponent } from './step-card/step-card.component';

export interface StepData {
  id: number;
  title: string;
  description: string;
  icon: string;
  gradientFrom: string;
  gradientTo: string;
  bgColor: string;
}

@Component({
  selector: 'app-home-how-does-stay-at-work',
  imports: [CommonModule, StepCardComponent],
  templateUrl: './home-how-does-stay-at-work.html',
  styleUrl: './home-how-does-stay-at-work.scss',
  standalone: true,
})
export class HomeHowDoesStayAtWork {
  steps: StepData[] = [
    {
      id: 1,
      title: 'Smart Search',
      description: 'Use smart search and type naturally to understand your needs',
      icon: 'fas fa-search',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 2,
      title: 'Browse & Compare',
      description: 'Discover thousands of properties, compare, and save your favorites',
      icon: 'fas fa-eye',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 3,
      title: 'Book or List',
      description: 'Book managed units instantly, or contact the owner directly',
      icon: 'fas fa-check-circle',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 4,
      title: 'Move Securely',
      description: 'Complete the process securely with our support throughout your journey',
      icon: 'fas fa-key',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  onStartJourney(): void {
    // Handle start journey button click
    console.log('Start journey clicked');
  }
}
