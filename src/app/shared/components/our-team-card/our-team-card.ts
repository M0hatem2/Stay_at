import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-our-team-card',
  imports: [CommonModule],
  templateUrl: './our-team-card.html',
  styleUrl: './our-team-card.scss',
})
export class OurTeamCard {
  @Input() member!: TeamMember;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}
