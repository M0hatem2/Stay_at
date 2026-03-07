import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsHeader } from '../components/projects-header/projects-header';
import { ProjectsData } from '../components/projects-data/projects-data';
import { Projects } from '../components/projects/projects';
import { YouDeveloper } from "../components/you-developer/you-developer";

@Component({
  selector: 'app-projects-page',
  imports: [ProjectsHeader, ProjectsData, Projects, YouDeveloper],
  templateUrl: './projects.page.html',
  styleUrl: './projects.page.scss',
})
export class ProjectsPage {
  searchQuery = '';
  searchVersion = 0;

  constructor(private router: Router) { }

  onSearch(query: string): void {
    this.searchQuery = query;
    this.searchVersion++;
  }

  onClearSearch(): void {
    this.searchQuery = '';
    this.searchVersion++;
  }

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
