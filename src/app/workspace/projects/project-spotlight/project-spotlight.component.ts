import { Component, Input, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-spotlight',
  standalone: true,
  imports: [RouterLink, Button, CommonModule],
  templateUrl: './project-spotlight.component.html',
  styleUrl: './project-spotlight.component.scss'
})
export class ProjectSpotlightComponent implements OnInit, AfterViewInit {
  @Input() project: any;
  @ViewChild('spotlightContainer', { static: false }) spotlightContainer!: ElementRef;

  badgeText: string = '';
  projectRoute: string = '';

  ngOnInit(): void {
    if (this.project) {
      this.badgeText = this.project.spotlight ? 'Featured' : 'Latest Project';
      // Use slug if available, otherwise use id
      this.projectRoute = this.project.slug 
        ? `/project/${this.project.slug}` 
        : `/project/${this.project.id}`;
    }
  }

  ngAfterViewInit(): void {
    // Set up intersection observer for scroll animations
    if (this.spotlightContainer && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              // Unobserve after animation to improve performance
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Use setTimeout to ensure the view is rendered
      setTimeout(() => {
        const element = this.spotlightContainer?.nativeElement;
        if (element) {
          observer.observe(element);
        }
      }, 100);
    } else if (this.spotlightContainer) {
      // Fallback: show immediately if IntersectionObserver is not supported
      this.spotlightContainer.nativeElement.classList.add('visible');
    }
  }

  getTagline(): string {
    return this.project?.tagline || this.getShortenedDescription();
  }

  getShortenedDescription(): string {
    if (!this.project?.description) return '';
    const maxLength = 120;
    return this.project.description.length > maxLength
      ? this.project.description.substring(0, maxLength) + '...'
      : this.project.description;
  }

  getHighlights(): string[] {
    return this.project?.highlights || [];
  }

  getVisibleTechnologies(): string[] {
    if (!this.project?.technologies) return [];
    // Show max 6 technologies
    return this.project.technologies.slice(0, 6);
  }

  getRemainingTechCount(): number {
    if (!this.project?.technologies) return 0;
    return Math.max(0, this.project.technologies.length - 6);
  }

  goToLiveUrl(url: string): void {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
