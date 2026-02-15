import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AboutHeader } from '../components/about-header/about-header';
import { AboutStatistics } from '../components/about-statistics/about-statistics';
import { AboutOurStory } from '../components/about-our-story/about-our-story';
import { AboutOurMission } from '../components/about-our-mission/about-our-mission';
import { AboutOurValues } from '../components/about-our-values/about-our-values';
import { AboutOurTeam } from '../components/about-our-team/about-our-team';
import { ContactUs } from '../../../shared/components/contact-us/contact-us';

@Component({
  selector: 'app-about-page',
  imports: [
    AboutHeader,
    AboutStatistics,
    AboutOurStory,
    AboutOurMission,
    AboutOurValues,
    AboutOurTeam,
    ContactUs,
  ],
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss',
})
export class AboutPage {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/auth/login']);
  }

  goToRegister() {
    this.router.navigate(['/auth/register']);
  }

  goToSignIn() {
    this.router.navigate(['/auth/sign-in']);
  }

  goToSignUp() {
    this.router.navigate(['/auth/sign-up']);
  }

  goToRegisterPop() {
    this.router.navigate(['/auth/register-pop']);
  }
}
