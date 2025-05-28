import {Component, OnInit} from '@angular/core';
import {Button} from 'primeng/button';
import {CentralService} from '../../shared/central-service/central.service';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-projects',
  imports: [
    Button,
    RouterLink
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit{
  projects :any[] = [];
  filters = [
    {
      label: 'All'
    },
    {
      label: 'Professional Work'
    },
    {
      label: 'Freelance'
    },
    {
      label: 'Personal Projects'
    }
  ]
  selectedFilter = this.filters[0];
  displayCount = 6;

  constructor(private service: CentralService) { }
    ngOnInit(): void {
      this.service.getProjects().subscribe({
        next: (data:any) => {
          this.projects = data;
        }
      })
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
