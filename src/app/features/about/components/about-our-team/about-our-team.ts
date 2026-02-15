import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamCard, TeamMember } from '../../../../shared/components/our-team-card/our-team-card';

@Component({
  selector: 'app-about-our-team',
  imports: [CommonModule, OurTeamCard],
  templateUrl: './about-our-team.html',
  styleUrl: './about-our-team.scss',
})
export class AboutOurTeam {
  teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Ahmed Hassan',
      role: 'Founder and CEO',
      image: 'https://images.unsplash.com/photo-1737574821698-862e77f044c1?w=400&h=400&fit=crop',
      linkedinUrl: '#',
      twitterUrl: '#',
    },
    {
      id: 2,
      name: 'Sara Mahmoud',
      role: 'Technical Development Manager',
      image: 'https://images.unsplash.com/photo-1610631066894-62452ccb927c?w=400&h=400&fit=crop',
      linkedinUrl: '#',
      twitterUrl: '#',
    },
    {
      id: 3,
      name: 'Mohamed Ali',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      linkedinUrl: '#',
      twitterUrl: '#',
    },
    {
      id: 4,
      name: 'Nourhan Khalid',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      linkedinUrl: '#',
      twitterUrl: '#',
    },
  ];
}
