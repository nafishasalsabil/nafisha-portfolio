import { Component } from '@angular/core';
import {TopbarComponent} from '../topbar/topbar/topbar.component';
import {RouterOutlet} from '@angular/router';
import {DashboardComponent} from '../../workspace/dashboard/dashboard.component';
import {AboutMeComponent} from '../../workspace/about-me/about-me.component';
import {ServicesComponent} from '../../workspace/services/services.component';
import {ResumeComponent} from '../../workspace/resume/resume.component';
import {ProjectsComponent} from '../../workspace/projects/projects.component';

@Component({
  selector: 'app-main',
  imports: [
    TopbarComponent,
    RouterOutlet,
    DashboardComponent,
    AboutMeComponent,
    ServicesComponent,
    ResumeComponent,
    ProjectsComponent
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
