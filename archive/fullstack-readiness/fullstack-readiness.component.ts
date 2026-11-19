import { Component, OnInit } from '@angular/core';
import { CentralService } from '../../shared/central-service/central.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fullstack-readiness',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './fullstack-readiness.component.html',
  styleUrl: './fullstack-readiness.component.scss'
})
export class FullstackReadinessComponent implements OnInit {
  projects: any[] = [];
  readinessItems: any[] = [];

  constructor(private service: CentralService) {}

  ngOnInit(): void {
    this.service.getProjects().subscribe({
      next: (data: any) => {
        this.projects = data;
        this.buildReadinessItems();
      }
    });
  }

  private buildReadinessItems(): void {
    // Find proof projects
    const fmcgProject = this.projects.find(p => p.slug === 'fmcg-inventory-system');
    const careInvoiceProject = this.projects.find(p => p.slug === 'careinvoice');
    const integratedProjects = this.projects.filter(p => 
      p.backendType === 'integrated' && 
      (p.slug === 'jotno-admin-panel-org' || 
       p.slug === 'jotno-doctor-web' || 
       p.slug === 'edcr-electronic-daily-call-report' || 
       p.slug === 'mrs' || 
       p.slug === 'central-admin-panel')
    );

    this.readinessItems = [
      {
        label: 'Major Programming Languages',
        proof: 'TypeScript, JavaScript' + (careInvoiceProject ? ', Java' : ''),
        projects: [
          ...(fmcgProject ? [fmcgProject] : []),
          ...(careInvoiceProject ? [careInvoiceProject] : []),
          ...(integratedProjects.length > 0 ? [integratedProjects[0]] : [])
        ].slice(0, 2)
      },
      {
        label: 'Web Technologies',
        proof: 'HTML, CSS, JavaScript',
        projects: this.projects.filter(p => 
          p.technologies?.some((t: string) => 
            t.toLowerCase().includes('html') || 
            t.toLowerCase().includes('css') || 
            t.toLowerCase().includes('javascript')
          )
        ).slice(0, 2)
      },
      {
        label: 'Backend Framework Experience',
        proof: 'Spring Boot (built + integrated), NestJS (built)',
        projects: [
          ...(careInvoiceProject ? [careInvoiceProject] : []),
          ...(fmcgProject ? [fmcgProject] : []),
          ...(integratedProjects.length > 0 ? [integratedProjects[0]] : [])
        ].slice(0, 2)
      },
      {
        label: 'SPA Frameworks',
        proof: 'Angular (production), React (multiple projects)',
        projects: this.projects.filter(p => 
          p.technologies?.some((t: string) => 
            t.toLowerCase() === 'angular' || t.toLowerCase() === 'react'
          )
        ).slice(0, 2)
      },
      {
        label: 'Relational Database',
        proof: 'PostgreSQL (FMCG), MySQL (integrated projects)',
        projects: [
          ...(fmcgProject ? [fmcgProject] : []),
          ...(integratedProjects.length > 0 ? [integratedProjects[0]] : [])
        ].slice(0, 2)
      },
      {
        label: 'OOP & Architecture',
        proof: 'Modular architecture, DI, services, DTOs, reusable components',
        projects: [
          ...(fmcgProject ? [fmcgProject] : []),
          ...(careInvoiceProject ? [careInvoiceProject] : [])
        ].slice(0, 2)
      }
    ];
  }

  getProjectRoute(project: any): string {
    return project.slug ? `/project/${project.slug}` : `/project/${project.id}`;
  }
}
