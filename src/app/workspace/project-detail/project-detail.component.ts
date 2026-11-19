import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  CentralService,
  Project,
  ProjectHighlight,
  ProjectLiveLink
} from '../../shared/central-service/central.service';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { resolveTechIcons, TechBadgeIcon } from '../../shared/icons/tech-icons';

const HOME_TITLE = 'Nafisha Salsabil | Software Engineer';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {
  project: Project | null = null;
  previousProject: Project | null = null;
  nextProject: Project | null = null;
  notFound = false;
  selectedGalleryIndex = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private service: CentralService,
    private router: Router,
    private title: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const identifier = params.get('id') || params.get('slug');
      if (identifier) {
        this.loadProjectData(identifier);
      }
    });
  }

  ngOnDestroy(): void {
    this.title.setTitle(HOME_TITLE);
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjectData(identifier: string | number): void {
    this.selectedGalleryIndex = 0;

    this.service
      .getProjects()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (projects: Project[]) => {
          const project = projects.find((p) => p.slug === identifier || p.id == identifier);

          if (!project) {
            this.notFound = true;
            this.project = null;
            this.previousProject = null;
            this.nextProject = null;
            this.title.setTitle(`Project not found | Nafisha Salsabil`);
            return;
          }

          this.project = project;
          this.notFound = false;
          this.title.setTitle(`${project.label} | Nafisha Salsabil`);
          this.setupNavigation(project, projects);
        },
        error: () => {
          this.notFound = true;
          this.project = null;
          this.previousProject = null;
          this.nextProject = null;
          this.title.setTitle(`Project not found | Nafisha Salsabil`);
        }
      });
  }

  private setupNavigation(current: Project, all: Project[]): void {
    const index = all.findIndex((p) => p.id === current.id);
    this.previousProject = index > 0 ? all[index - 1] : null;
    this.nextProject = index >= 0 && index < all.length - 1 ? all[index + 1] : null;
  }

  getPrimaryImage(): string {
    if (!this.project?.img) {
      return '';
    }
    return `assets/images/projects/${this.project.img}`;
  }

  getGalleryImages(): string[] {
    if (!this.project?.screenshots?.length) {
      return [];
    }
    const primary = this.project.img;
    return this.project.screenshots.filter((shot) => {
      const name = shot.split('/').pop() || shot;
      return name !== primary;
    });
  }

  getGallerySrc(shot: string): string {
    return shot.startsWith('http') ? shot : `assets/images/projects/${shot}`;
  }

  selectGalleryImage(index: number): void {
    this.selectedGalleryIndex = index;
  }

  getTagline(): string {
    return this.project?.tagline?.trim() || '';
  }

  getRole(): string {
    return this.project?.role?.trim() || '';
  }

  getStatus(): string {
    if (this.project?.status?.trim()) {
      return this.project.status.trim();
    }
    if (this.project?.live?.trim()) {
      return 'Live';
    }
    return '';
  }

  getCategory(): string {
    return this.project?.category?.trim() || '';
  }

  getTechnologies(): string[] {
    return this.project?.technologies?.filter(Boolean) || [];
  }

  getTechBadges(): TechBadgeIcon[] {
    return resolveTechIcons(this.getTechnologies());
  }

  getTechSummary(limit = 3): string {
    return this.getTechnologies().slice(0, limit).join(' · ');
  }

  /** Compact stack for the metadata row; full list lives in Tech Stack chips. */
  getMetaTechLabel(): string {
    const techs = this.getTechnologies();
    if (!techs.length) {
      return '';
    }
    if (techs.length <= 3) {
      return techs.join(', ');
    }
    return `${techs.slice(0, 3).join(', ')} +${techs.length - 3}`;
  }

  getHighlights(): ProjectHighlight[] {
    return (
      this.project?.highlights?.filter(
        (h) => h?.title?.trim() && h?.description?.trim()
      ) || []
    );
  }

  getChallenges(): string[] {
    return this.project?.challenges?.filter((c) => c?.trim()) || [];
  }

  /** Valid multi-demo links from `liveLinks` (label + url required). */
  getLiveLinks(): ProjectLiveLink[] {
    return (
      this.project?.liveLinks?.filter(
        (link) => link?.label?.trim() && link?.url?.trim()
      ) || []
    );
  }

  hasLiveLinks(): boolean {
    return this.getLiveLinks().length > 0;
  }

  /** Single Live Demo only when `liveLinks` is absent/empty. */
  hasLiveUrl(): boolean {
    if (this.hasLiveLinks()) {
      return false;
    }
    return !!this.project?.live?.trim();
  }

  hasGithubUrl(): boolean {
    return !!this.project?.github?.trim();
  }

  hasDemoActions(): boolean {
    return this.hasLiveLinks() || this.hasLiveUrl() || this.hasGithubUrl();
  }

  projectRoute(project: Project): string {
    return project.slug ? `/project/${project.slug}` : `/project/${project.id}`;
  }

  navigateToProject(project: Project | null): void {
    if (!project) {
      return;
    }
    this.router.navigate([this.projectRoute(project)]).then(() => {
      this.onNavActivate();
    });
  }

  onNavActivate(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
