import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AboutMeComponent } from '../../workspace/about-me/about-me.component';
import { ContactMeComponent } from '../../workspace/contact-me/contact-me.component';
import { DashboardComponent } from '../../workspace/dashboard/dashboard.component';
import { ProjectsComponent } from '../../workspace/projects/projects.component';
import { ResumeComponent } from '../../workspace/resume/resume.component';

@Component({
  selector: 'app-landing',
  imports: [
    AboutMeComponent,
    ContactMeComponent,
    DashboardComponent,
    ProjectsComponent,
    ResumeComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit {
  constructor(private title: Title) {}

  ngOnInit(): void {
    this.title.setTitle('Nafisha Salsabil | Software Engineer');
  }
}
