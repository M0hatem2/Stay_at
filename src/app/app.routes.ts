import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { HomePage } from './features/home/pages/home.page';
import { AllPropertiesPage } from './features/all-properties/pages/all-properties.page';
import { RentPage } from './features/rent/pages/rent.page';
import { BuyPage } from './features/buy/pages/buy.page';
import { ProjectsPage } from './features/projects/pages/projects.page';
import { AboutPage } from './features/about/pages/about.page';
import { UnitDetails } from './shared/components/unit-details/unit-details';
import { BuyUnitDetails } from './shared/components/buy-unit-details/buy-unit-details';
import { ProjectsDetails } from './shared/components/projects-details/projects-details';
import { AccountsInformation } from './shared/components/accounts-information/accounts-information';
import { BrokerDashboardComponent } from './features/dashbords/broker/broker-dashboard.component';
import { DeveloperDashboardComponent } from './features/dashbords/developer/developer-dashboard.component';
import { OwnerDashboardComponent } from './features/dashbords/owner/owner-dashboard.component';
import { SeekerDashboardComponent } from './features/dashbords/seeker/seeker-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomePage },
      { path: 'all-properties', component: AllPropertiesPage },
      {
        path: 'rent/:id',
        component: UnitDetails,
        data: { prerender: false },
      },
      { path: 'rent', component: RentPage },
      {
        path: 'buy/:id',
        component: BuyUnitDetails,
        data: { prerender: false },
      },
      { path: 'buy', component: BuyPage },
      {
        path: 'projects/:id',
        component: ProjectsDetails,
        data: { prerender: false },
      },
      { path: 'projects', component: ProjectsPage },
      { path: 'about', component: AboutPage },

      // Favorites Page
      {
        path: 'favorites',
        loadComponent: () => import('./features/favorites/favorites').then((m) => m.Favorites),
      },

      // Plans Page
      {
        path: 'plans',
        loadComponent: () => import('./features/plans/plans').then((m) => m.Plans),
      },

      {
        path: 'property/:id',
        component: UnitDetails,
        data: { prerender: false },
      },
      {
        path: 'accounts-information/:role/:id',
        component: AccountsInformation,
      },

      // Dashboard Routes
      {
        path: 'dashboard/real_estate_broker',
        component: BrokerDashboardComponent,
        // data: { prerender: false },
      },
      {
        path: 'dashboard/real_estate_developer',
        component: DeveloperDashboardComponent,
        // data: { prerender: false },
      },
      {
        path: 'dashboard/property_owner',
        component: OwnerDashboardComponent,
        // data: { prerender: false },
      },
      {
        path: 'dashboard/property_owner/add-property',
        loadComponent: () =>
          import('./features/dashbords/add-new-property/add-new-property').then(
            (m) => m.AddNewProperty,
          ),
        // data: { prerender: false },
      },
      {
        path: 'dashboard/property_seeker',
        component: SeekerDashboardComponent,
        // data: { prerender: false },
      },
    ],
  },
  {
    path: 'dashboard/system_admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./features/dashbords/admin/admin.routes').then((m) => m.adminRoutes),
        // data: { prerender: false },
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login.page').then((m) => m.LoginPage),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./features/auth/register/register.page').then((m) => m.RegisterPage),
      },
      {
        path: 'sign-in',
        loadComponent: () =>
          import('./features/auth/components/sign-in/sign-in').then((m) => m.SignInComponent),
      },

      {
        path: 'confirm-email',
        loadComponent: () =>
          import('./features/auth/components/confirm-email/confirm-email').then(
            (m) => m.ConfirmEmailComponent,
          ),
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./features/auth/components/forgot-password/forgot-password').then(
            (m) => m.ForgotPasswordComponent,
          ),
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./features/auth/components/reset-password/reset-password').then(
            (m) => m.ResetPasswordComponent,
          ),
      },
      {
        path: 'resend-otp',
        loadComponent: () =>
          import('./features/auth/components/resend-otp/resend-otp').then(
            (m) => m.ResendOtpComponent,
          ),
      },
      {
        path: 'refresh-token',
        loadComponent: () =>
          import('./features/auth/components/refresh-token/refresh-token').then(
            (m) => m.RefreshTokenComponent,
          ),
      },
      {
        path: 'logout',
        loadComponent: () =>
          import('./features/auth/components/logout/logout').then((m) => m.LogoutComponent),
      },
      {
        path: 'register-pop',
        loadComponent: () =>
          import('./features/auth/components/register-pop/register-pop').then(
            (m) => m.RegisterPopComponent,
          ),
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];
