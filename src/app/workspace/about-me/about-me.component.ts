import { Component } from '@angular/core';

export interface ExpertiseArea {
  title: string;
  description: string;
  technologies: string[];
  icon: string;
}

@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  readonly resumeUrl = 'assets/Nafisha_Salsabil_Resume.pdf';
  readonly portraitUrl = 'assets/images/me.webp';

  /**
   * About copy that expands beyond the hero introduction.
   */
  readonly aboutParagraphs = [
    'As a software engineer, I build full-stack web applications that turn complex business workflows into clean, reliable software—with careful attention to maintainability and everyday usability.',
    'Alongside product delivery, I work with Python automation and data-driven tooling to streamline dashboards, admin systems, and repetitive processes so teams can move faster with fewer errors.',
    'I care about shipping products that feel thoughtful and dependable—interfaces people trust, backed by systems that stay understandable as they grow.'
  ];

  /**
   * Four focused expertise areas drawn from existing services + skills data.
   */
  readonly expertiseAreas: ExpertiseArea[] = [
    {
      title: 'Frontend Engineering',
      description:
        'Building responsive, performant web interfaces with Angular and modern UI practices, including reactive patterns and component-driven architecture.',
      technologies: ['Angular', 'React', 'TypeScript', 'PrimeNG'],
      icon: 'pi pi-desktop'
    },
    {
      title: 'Full-Stack Development',
      description:
        'Connecting frontend experiences to backend systems through REST APIs, service integrations, and data layers used across production and personal projects.',
      technologies: ['Spring Boot', 'Laravel', 'Firebase', 'PostgreSQL'],
      icon: 'pi pi-server'
    },
    {
      title: 'Automation & Integrations',
      description:
        'Designing workflow automation and API-driven tooling that reduce repetitive work and keep business processes consistent across dashboards and admin tools.',
      technologies: ['Python', 'REST APIs', 'Firebase', 'Node.js'],
      icon: 'pi pi-bolt'
    },
    {
      title: 'UI Engineering',
      description:
        'Translating designs into polished interfaces with attention to usability, visual balance, and pixel-accurate execution across product surfaces.',
      technologies: ['Figma', 'Tailwind CSS', 'PrimeNG'],
      icon: 'pi pi-sparkles'
    }
  ];
}
