import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsCard } from '../../../../shared/components/projects-card/projects-card';
import { Project } from '../../../../core/models/project.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ProjectsCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  constructor(private router: Router) {}

  projects: Project[] = [
    {
      id: '1',
      name: 'العاصمة جاردنز',
      developer: 'شركة التطوير العقاري',
      location: 'العاصمة الإدارية الجديدة',
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      deliveryDate: '2025',
      unitTypes: ['شقق', 'دوبليكس', 'بنتهاوس'],
      startingPrice: 2,
      totalUnits: 420,
    },
    {
      id: '2',
      name: 'زايد هايتس',
      developer: 'المجموعة العقارية المتحدة',
      location: 'الشيخ زايد، الجيزة',
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      deliveryDate: '2024',
      unitTypes: ['شقق', 'فلل', 'تاون هاوس'],
      startingPrice: 3,
      totalUnits: 320,
    },
    {
      id: '3',
      name: 'التجمع ريزيدنس',
      developer: 'إعمار مصر',
      location: 'التجمع الخامس، القاهرة الجديدة',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      deliveryDate: '2024',
      unitTypes: ['شقق', 'دوبليكس'],
      startingPrice: 2,
      totalUnits: 560,
    },
    {
      id: '4',
      name: 'أكتوبر فيوز',
      developer: 'طلعت مصطفى',
      location: '6 أكتوبر، الجيزة',
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      deliveryDate: '2025',
      unitTypes: ['شقق', 'استوديو'],
      startingPrice: 1,
      totalUnits: 680,
    },
    {
      id: '5',
      name: 'القاهرة سيتي',
      developer: 'سوديك',
      location: 'القاهرة الجديدة',
      imageUrl: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800&h=600&fit=crop',
      deliveryDate: '2026',
      unitTypes: ['شقق', 'فلل', 'توين هاوس'],
      startingPrice: 3,
      totalUnits: 850,
    },
    {
      id: '6',
      name: 'نور سيتي',
      developer: 'بالم هيلز',
      location: 'العاصمة الإدارية الجديدة',
      imageUrl: 'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&h=600&fit=crop',
      deliveryDate: '2025',
      unitTypes: ['شقق', 'دوبليكس', 'بنتهاوس'],
      startingPrice: 2,
      totalUnits: 540,
    },
  ];

  onProjectClick(project: Project): void {
    this.router.navigate(['/projects', project.id], {
      state: { property: project },
    });
  }
}
