import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {CentralService} from '../../shared/central-service/central.service';
import {RouterLink} from '@angular/router';
import {ProjectSpotlightComponent} from './project-spotlight/project-spotlight.component';

@Component({
  selector: 'app-projects',
  imports: [
    Button,
    RouterLink,
    ProjectSpotlightComponent
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];
  spotlightProject: any = null;
  filters = [
    {
      label: 'All'
    },
    {
      label: 'Professional Work'
    },
    
    {
      label: 'Personal Projects'
    },
    {
      label: 'Freelance'
    },
  ]
  selectedFilter = this.filters[0];
  displayCount = 6;

  constructor(private service: CentralService) { }
  
  ngOnInit(): void {
    // Projects are already sorted by addedAt DESC from service
    this.service.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data; // Already sorted by addedAt DESC
        this.spotlightProject = this.selectSpotlightProject(data);
      }
    })
  }

  /**
   * Selects the spotlight project based on priority:
   * 1. If any project has spotlight: true, pick that (if multiple, newest by addedAt)
   * 2. Else show newest by addedAt
   * 3. Else fallback to highest id
   */
  selectSpotlightProject(projects: any[]): any {
    if (!projects || projects.length === 0) return null;

    // Filter projects with spotlight flag
    const spotlightProjects = projects.filter(p => p.spotlight === true);
    
    if (spotlightProjects.length > 0) {
      // If multiple spotlight projects, pick newest by addedAt
      return this.getNewestByDate(spotlightProjects);
    }

    // Filter projects with addedAt dates
    const projectsWithDate = projects.filter(p => p.addedAt);
    
    if (projectsWithDate.length > 0) {
      // Show newest by addedAt
      return this.getNewestByDate(projectsWithDate);
    }

    // Fallback to highest id
    return projects.reduce((prev, current) => 
      (prev.id > current.id) ? prev : current
    );
  }

  private getNewestByDate(projects: any[]): any {
    return projects.reduce((newest, current) => {
      const currentDate = current.addedAt ? new Date(current.addedAt).getTime() : 0;
      const newestDate = newest.addedAt ? new Date(newest.addedAt).getTime() : 0;
      return currentDate > newestDate ? current : newest;
    });
  }
  selectFilter(filter: any) {
    this.selectedFilter = filter;
    this.displayCount = 6;
  }

  get filteredProjects(): any[] {
    const filtered = this.selectedFilter.label === 'All'
      ? this.projects
      : this.projects.filter(p => p.category === this.selectedFilter.label);

    return filtered.slice(0, this.displayCount);
  }

  get showMoreButton(): boolean {
    const filtered = this.selectedFilter.label === 'All'
      ? this.projects
      : this.projects.filter(p => p.category === this.selectedFilter.label);

    return this.displayCount < filtered.length;
  }

  loadMore() {
    this.displayCount += 6;
  }


}
