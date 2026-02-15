import { Routes } from '@angular/router';
import { Admin } from './admin';
import { DashboardHome } from './components/features/dashbords/admin/components/dashboard-home/dashboard-home';
import { UsersManagement } from './components/features/dashbords/admin/components/users-management/users-management';
import { PropertiesManagement } from './components/features/dashbords/admin/components/properties-management/properties-management';
import { ProjectsManagement } from './components/features/dashbords/admin/components/projects-management/projects-management';
import { InquiriesMessages } from './components/features/dashbords/admin/components/inquiries-messages/inquiries-messages';
import { Appointments } from './components/features/dashbords/admin/components/appointments/appointments';
import { Contracts } from './components/features/dashbords/admin/components/contracts/contracts';
import { FinancialTransactions } from './components/features/dashbords/admin/components/financial-transactions/financial-transactions';
import { Reports } from './components/features/dashbords/admin/components/reports/reports';
import { AdvancedAnalytics } from './components/features/dashbords/admin/components/advanced-analytics/advanced-analytics';
import { ActivityLog } from './components/features/dashbords/admin/components/activity-log/activity-log';
import { Settings } from './components/features/dashbords/admin/components/settings/settings';

export const adminRoutes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      { path: '', redirectTo: 'dashboard-home', pathMatch: 'full' },
      { path: 'dashboard-home', component: DashboardHome, title: 'Dashboard Home' },
      { path: 'users-management', component: UsersManagement, title: 'Users Management' },
      { path: 'properties-management', component: PropertiesManagement, title: 'Properties Management' },
      { path: 'projects-management', component: ProjectsManagement, title: 'Projects Management' },
      { path: 'inquiries-messages', component: InquiriesMessages, title: 'Inquiries & Messages' },
      { path: 'appointments', component: Appointments, title: 'Appointments' },
      { path: 'contracts', component: Contracts, title: 'Contracts' },
      { path: 'financial-transactions', component: FinancialTransactions, title: 'Financial Transactions' },
      { path: 'reports', component: Reports, title: 'Reports' },
      { path: 'advanced-analytics', component: AdvancedAnalytics, title: 'Advanced Analytics' },
      { path: 'activity-log', component: ActivityLog, title: 'Activity Log' },
      { path: 'settings', component: Settings, title: 'Settings' },
    ]
  }
];