import { Component, Input, OnChanges, AfterViewInit, ElementRef, ViewChild, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/central-service/central.service';
import { projectImagePath } from '../../../shared/images/project-image';

@Component({
  selector: 'app-project-spotlight',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './project-spotlight.component.html',
  styleUrl: './project-spotlight.component.scss'
})
export class ProjectSpotlightComponent implements OnChanges, AfterViewInit {
  @Input() project: Project | null = null;
  @ViewChild('spotlightContainer', { static: false }) spotlightContainer!: ElementRef;

  badgeText = 'Featured';
  projectRoute = '';

  projectImgSrc(img: string): string {
    return projectImagePath(img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['project'] && this.project) {
      this.badgeText = this.project.spotlight ? 'Featured' : 'Latest project';
      this.projectRoute = this.project.slug
        ? `/project/${this.project.slug}`
        : `/project/${this.project.id}`;
    }
  }

  ngAfterViewInit(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      this.spotlightContainer?.nativeElement?.classList.add('is-visible');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    setTimeout(() => {
      const element = this.spotlightContainer?.nativeElement;
      if (element) {
        observer.observe(element);
      }
    }, 40);
  }

  /** Concise featured overview — prefers tagline for the immersive intro. */
  getOverview(): string {
    if (this.project?.tagline) {
      return this.project.tagline;
    }
    if (!this.project?.description) {
      return '';
    }
    const max = 150;
    const text = this.project.description.trim();
    return text.length > max ? text.substring(0, max).trimEnd() + '…' : text;
  }

  getHighlights(): string[] {
    return (this.project?.highlights || [])
      .filter((h) => h?.title?.trim())
      .map((h) => h.title.trim());
  }

  getVisibleTechnologies(): string[] {
    if (!this.project?.technologies) return [];
    return this.project.technologies.slice(0, 4);
  }
}
