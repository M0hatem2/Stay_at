import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeHeader } from '../components/home-header/home-header';
import { HomeFeaturedUnits } from '../components/home-featured-units/home-featured-units';
import { HomeTopAreas } from '../components/home-top-areas/home-top-areas';
import { HomeWhyStayAt } from '../components/home-why-stay-at/home-why-stay-at';
import { HomeWhoAreYou } from '../components/home-who-are-you/home-who-are-you';
import { HomeHowDoesStayAtWork } from '../components/home-how-does-stay-at-work/home-how-does-stay-at-work';
import { HomeReport } from '../components/home-report/home-report';
import { HomeOurCustomersSay } from "../components/home-our-customers-say/home-our-customers-say";
import { DownloadTheAppNow } from "../components/download-the-app-now/download-the-app-now";
import { NotLoggedInComponent } from "../../../shared/components/not-logged-in/not-logged-in";

@Component({
  selector: 'app-home-page',
  imports: [
    HomeHeader,
    HomeFeaturedUnits,
    HomeTopAreas,
    HomeWhyStayAt,
    HomeWhoAreYou,
    HomeHowDoesStayAtWork,
    HomeReport,
    HomeOurCustomersSay,
    DownloadTheAppNow,
    NotLoggedInComponent
],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {
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
