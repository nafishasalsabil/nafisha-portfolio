import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {DashboardComponent} from '../../workspace/dashboard/dashboard.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
    ]
  }]
