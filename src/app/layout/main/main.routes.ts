import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {DashboardComponent} from '../../workspace/dashboard/dashboard.component';
import {ProjectDetailComponent} from '../../workspace/project-detail/project-detail.component';
import {LandingComponent} from '../landing/landing.component';

export const mainRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingComponent, // Has scrollable sections
      },
      {
        path: 'project/:id',
        component: ProjectDetailComponent
      },
    ]
  }]
