import { Component } from '@angular/core';
import {AboutMeComponent} from "../../workspace/about-me/about-me.component";
import {ContactMeComponent} from "../../workspace/contact-me/contact-me.component";
import {DashboardComponent} from "../../workspace/dashboard/dashboard.component";
import {ProjectsComponent} from "../../workspace/projects/projects.component";
import {ResumeComponent} from "../../workspace/resume/resume.component";
import {ServicesComponent} from "../../workspace/services/services.component";

@Component({
  selector: 'app-landing',
    imports: [
        AboutMeComponent,
        ContactMeComponent,
        DashboardComponent,
        ProjectsComponent,
        ResumeComponent,
        ServicesComponent
    ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
