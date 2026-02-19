import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CentralService, Project } from '../../shared/central-service/central.service';
import { Breadcrumb } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    Breadcrumb,
    Button,
    RouterLink,
    CommonModule
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mainPreview', { static: false }) mainPreview!: ElementRef;
  
  project: Project | null = null;
  allProjects: Project[] = [];
  previousProject: Project | null = null;
  nextProject: Project | null = null;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  notFound = false;
  
  selectedScreenshotIndex = 0;
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private service: CentralService,
    private router: Router
  ) {
    this.home = { label: "Nafisha", routerLink: '/', icon: 'none' };
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe(params => {
      const identifier = params.get('id') || params.get('slug');
      if (identifier) {
        this.loadProjectData(identifier);
      }
    });
  }

  ngAfterViewInit(): void {
    // Trigger hero animations on load
    setTimeout(() => {
      const heroElement = document.querySelector('.project-hero');
      if (heroElement) {
        heroElement.setAttribute('data-hero-loaded', 'true');
        // Also add class to host for CSS targeting
        const hostElement = document.querySelector('app-project-detail');
        if (hostElement) {
          hostElement.classList.add('hero-loaded');
        }
      }
    }, 100);
    
    // Set up intersection observer for scroll animations
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      setTimeout(() => {
        const elements = document.querySelectorAll('[data-scroll-reveal]');
        elements.forEach(el => observer.observe(el));
      }, 200);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProjectData(identifier: string | number): void {
    // Load all projects to get sorted list for navigation
    this.service.getProjects().pipe(takeUntil(this.destroy$)).subscribe({
      next: (projects: Project[]) => {
        this.allProjects = projects;
        const project = projects.find(p => p.slug === identifier || p.id == identifier);
        
        if (!project) {
          this.notFound = true;
          this.project = null;
          return;
        }

        this.project = project;
        this.notFound = false;
        this.setupNavigation(project, projects);
        this.setupBreadcrumb();
      },
      error: () => {
        this.notFound = true;
        this.project = null;
      }
    });
  }

  private setupNavigation(currentProject: Project, allProjects: Project[]): void {
    const currentIndex = allProjects.findIndex(p => p.id === currentProject.id);
    
    // Previous = newer (index - 1)
    this.previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    
    // Next = older (index + 1)
    this.nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;
  }

  private setupBreadcrumb(): void {
    if (!this.project) return;
    
    this.items = [
      {
        label: 'Projects',
        command: () => {
          this.router.navigate(['/'], { fragment: 'projects' });
        },
        styleClass: 'cursor-pointer hover:text-primary hover:underline'
      },
      { label: this.project.label }
    ];
  }

  getHeroImage(): string {
    if (!this.project) return 'assets/images/detail.jpg';
    
    if (this.project.screenshots && this.project.screenshots.length > 0) {
      return this.project.screenshots[0].startsWith('http') 
        ? this.project.screenshots[0]
        : `assets/images/projects/${this.project.screenshots[0]}`;
    }
    
    return `assets/images/projects/${this.project.img}`;
  }

  getMainPreviewImage(): string {
    if (!this.project) return '';
    
    if (this.project.screenshots && this.project.screenshots.length > 0) {
      const screenshot = this.project.screenshots[this.selectedScreenshotIndex];
      return screenshot.startsWith('http') 
        ? screenshot
        : `assets/images/projects/${screenshot}`;
    }
    
    return `assets/images/projects/${this.project.img}`;
  }

  getThumbnailImage(screenshot: string): string {
    return screenshot.startsWith('http') 
      ? screenshot
      : `assets/images/projects/${screenshot}`;
  }

  selectScreenshot(index: number): void {
    this.selectedScreenshotIndex = index;
  }

  getFormattedDate(): string {
    if (!this.project?.addedAt) return '';
    // Handle both ISO date strings and YYYY-MM-DD format
    const dateStr = this.project.addedAt.includes('T') 
      ? this.project.addedAt 
      : `${this.project.addedAt}T00:00:00`;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  getFormattedDateShort(): string {
    if (!this.project?.addedAt) return '';
    const dateStr = this.project.addedAt.includes('T') 
      ? this.project.addedAt 
      : `${this.project.addedAt}T00:00:00`;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }

  getTagline(): string {
    return this.project?.tagline || this.getDerivedShortTagline();
  }

  getDerivedShortTagline(): string {
    if (!this.project?.description) return '';
    // Extract first meaningful sentence or first 8-12 words
    const sentences = this.project.description.split(/[.!?]+/).filter(s => s.trim().length > 10);
    if (sentences.length > 0) {
      const firstSentence = sentences[0].trim();
      const words = firstSentence.split(/\s+/);
      // Take 8-12 words
      const targetWords = words.slice(0, Math.min(12, words.length));
      return targetWords.join(' ') + (words.length > 12 ? '...' : '');
    }
    // Fallback: take first 12 words from description
    const words = this.project.description.split(/\s+/).slice(0, 12);
    return words.join(' ') + '...';
  }

  getShortenedDescription(): string {
    if (!this.project?.description) return '';
    const maxLength = 120;
    return this.project.description.length > maxLength
      ? this.project.description.substring(0, maxLength) + '...'
      : this.project.description;
  }

  getHeroPreviewImage(): string {
    if (!this.project) return 'assets/images/detail.jpg';
    
    if (this.project.screenshots && this.project.screenshots.length > 0) {
      const screenshot = this.project.screenshots[0];
      return screenshot.startsWith('http') 
        ? screenshot
        : `assets/images/projects/${screenshot}`;
    }
    
    return `assets/images/projects/${this.project.img}`;
  }

  getHeroStatus(): string {
    if (this.project?.status) {
      if (this.project.status === 'Live' || (this.project.live && this.project.status === 'Live')) {
        return 'Live';
      }
      return this.project.status;
    }
    if (this.project?.live) return 'Live';
    return '';
  }

  getQuickFacts(): string[] {
    const facts: string[] = [];
    
    // Category (always)
    if (this.project?.category) {
      facts.push(this.project.category);
    }
    
    // Status
    const status = this.getHeroStatus();
    if (status) {
      facts.push(status);
    }
    
    // Added date
    const date = this.getFormattedDateShort();
    if (date) {
      facts.push(date);
    }
    
    // Top 2 technologies
    if (this.project?.technologies && this.project.technologies.length > 0) {
      const techs = this.project.technologies.slice(0, 2);
      facts.push(...techs);
    }
    
    // Cap at 5 items
    return facts.slice(0, 5);
  }

  getHighlights(): string[] {
    if (this.project?.highlights && this.project.highlights.length > 0) {
      return this.project.highlights;
    }
    // Fallback: derive 3 bullets from description
    if (this.project?.description) {
      const sentences = this.project.description.split(/[.!?]+/).filter(s => s.trim().length > 20);
      return sentences.slice(0, 3).map(s => s.trim());
    }
    return [];
  }

  getTopTechnologies(count: number = 2): string[] {
    return this.project?.technologies?.slice(0, count) || [];
  }

  getVisibleTechnologies(): string[] {
    return this.project?.technologies?.slice(0, 6) || [];
  }

  getRemainingTechCount(): number {
    if (!this.project?.technologies) return 0;
    return Math.max(0, this.project.technologies.length - 6);
  }

  getDeploymentStatus(): string {
    if (this.project?.status) return this.project.status;
    if (this.project?.live) return 'Live';
    return 'Prototype';
  }

  getRole(): string {
    return this.project?.role || 'End-to-end';
  }

  goToLiveUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  goToGithub(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }

  navigateToProject(project: Project | null): void {
    if (!project) return;
    const route = project.slug ? `/project/${project.slug}` : `/project/${project.id}`;
    this.router.navigate([route]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  getNavPreviewImage(project: Project): string {
    // Prefer screenshots[0] if available, else fallback to img
    if (project.screenshots && project.screenshots.length > 0) {
      const screenshot = project.screenshots[0];
      return screenshot.startsWith('http') 
        ? screenshot
        : `assets/images/projects/${screenshot}`;
    }
    return `assets/images/projects/${project.img}`;
  }

  getNavMetaLine(project: Project): string {
    const parts: string[] = [project.category];
    
    // Add up to 2 technologies
    if (project.technologies && project.technologies.length > 0) {
      const techs = project.technologies.slice(0, 2);
      parts.push(...techs);
    }
    
    return parts.join(' • ');
  }
}
