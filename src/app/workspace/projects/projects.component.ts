import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import {
  CentralService,
  Project,
  compareProjects
} from '../../shared/central-service/central.service';
import { RouterLink } from '@angular/router';
import { ProjectSpotlightComponent } from './project-spotlight/project-spotlight.component';
import { projectImagePath } from '../../shared/images/project-image';

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
  /** Number of large supporting cards under the spotlight. */
  private readonly prominentCount = 2;
  /** Number of compact supporting cards under the prominent row. */
  private readonly compactCount = 2;

  projects: Project[] = [];
  spotlightProject: Project | null = null;
  prominentProjects: Project[] = [];
  compactProjects: Project[] = [];
  browseMode = false;

  filters = [
    { label: 'All' },
    { label: 'Professional Work' },
    { label: 'Personal Projects' },
    { label: 'Freelance' }
  ];
  selectedFilter = this.filters[0];
  displayCount = 6;

  constructor(private service: CentralService) {}

  projectImgSrc(img: string): string {
    return projectImagePath(img);
  }

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (data: Project[]) => {
        // getProjects() already applies the shared sort utility.
        this.projects = data;
        this.spotlightProject = this.selectSpotlightProject(data);
        this.assignSelectedWorkCards(data);
      }
    });
  }

  /**
   * Spotlight selection is independent of card sorting:
   * 1. Prefer projects with spotlight: true
   * 2. If multiple, smallest displayOrder, then newest addedAt
   * 3. If none flagged, fall back to shared compare order (first project)
   */
  selectSpotlightProject(projects: Project[]): Project | null {
    if (!projects || projects.length === 0) {
      return null;
    }

    const flagged = projects.filter((p) => p.spotlight === true);
    if (flagged.length === 0) {
      return [...projects].sort(compareProjects)[0] ?? null;
    }

    if (flagged.length === 1) {
      return flagged[0];
    }

    return [...flagged].sort((a, b) => {
      const orderA = a.displayOrder ?? Number.POSITIVE_INFINITY;
      const orderB = b.displayOrder ?? Number.POSITIVE_INFINITY;
      if (orderA !== orderB) {
        return orderA - orderB;
      }

      const dateA = a.addedAt ? new Date(a.addedAt).getTime() : 0;
      const dateB = b.addedAt ? new Date(b.addedAt).getTime() : 0;
      if (dateA !== dateB) {
        return dateB - dateA;
      }

      return b.id - a.id;
    })[0];
  }

  /**
   * Homepage selected-work cards use the same ordering as the browse grid,
   * excluding the spotlight project so it is not duplicated.
   */
  private assignSelectedWorkCards(projects: Project[]): void {
    const support = projects
      .filter((p) => !this.spotlightProject || p.id !== this.spotlightProject.id)
      .sort(compareProjects);

    this.prominentProjects = support.slice(0, this.prominentCount);
    this.compactProjects = support.slice(
      this.prominentCount,
      this.prominentCount + this.compactCount
    );
  }

  get showFeaturedGrid(): boolean {
    return !this.browseMode && this.selectedFilter.label === 'All';
  }

  selectFilter(filter: { label: string }): void {
    this.selectedFilter = filter;
    this.displayCount = 6;
    if (filter.label !== 'All') {
      this.browseMode = true;
    } else if (!this.browseMode) {
      // Stay in curated All view when re-selecting All from curated mode
      this.browseMode = false;
    }
  }

  browseAllProjects(): void {
    this.browseMode = true;
    this.selectedFilter = this.filters[0];
    this.displayCount = 6;

    if (typeof document !== 'undefined') {
      const target = document.getElementById('project-filters');
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  showFeaturedView(): void {
    this.browseMode = false;
    this.selectedFilter = this.filters[0];
    this.displayCount = 6;
  }

  /** Browse/filter list excludes the featured project so it is not duplicated below the spotlight. */
  private projectsForBrowse(): Project[] {
    const base = this.selectedFilter.label === 'All'
      ? this.projects
      : this.projects.filter(p => p.category === this.selectedFilter.label);

    // projects is already sorted; filter preserves relative order.
    if (!this.spotlightProject) {
      return base;
    }

    return base.filter(p => p.id !== this.spotlightProject!.id);
  }

  get filteredProjects(): Project[] {
    return this.projectsForBrowse().slice(0, this.displayCount);
  }

  get filteredTotal(): number {
    return this.projectsForBrowse().length;
  }

  get showMoreButton(): boolean {
    return this.displayCount < this.filteredTotal;
  }

  loadMore(): void {
    this.displayCount += 6;
  }

  projectRoute(project: Project): string {
    return project.slug ? `/project/${project.slug}` : `/project/${project.id}`;
  }

  projectSummary(project: Project, max = 120): string {
    if (project.tagline) {
      return project.tagline.length > max
        ? project.tagline.slice(0, max).trimEnd() + '…'
        : project.tagline;
    }
    if (!project.description) {
      return '';
    }
    return project.description.length > max
      ? project.description.slice(0, max).trimEnd() + '…'
      : project.description;
  }

  /** Browse cards prefer the fuller description so short taglines don't look incomplete. */
  browseSummary(project: Project, max = 110): string {
    const text = project.description?.trim() || project.tagline || '';
    if (!text) {
      return '';
    }
    return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
  }

}
