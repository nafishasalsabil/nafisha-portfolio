import {Component, OnInit} from '@angular/core';
import {Timeline} from 'primeng/timeline';
import {NgClass, CommonModule} from '@angular/common';

export type SkillLevel = 'Advanced' | 'Proficient' | 'Working Knowledge' | 'Familiar';

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillCategory {
  label: string;
  icon?: string;
  skills: Skill[];
}

@Component({
  selector: 'app-resume',
  imports: [
    Timeline,
    NgClass,
    CommonModule
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
  events: any[];
  skillCategories: SkillCategory[] = [];
  selectedCategory: SkillCategory | null = null;
  screenWidth: number = window.innerWidth;
  protected readonly window = window;
  isAnimating = false;

  constructor() {
    this.events = [
      {
        date: '2024 – 2026',
        title: 'Software Engineer',
        company: 'Square Health Ltd.',
        description: 'Developed production-grade Angular applications using PrimeNG and Tailwind. Delivered modules including invoice generation, prescriber location tracking, dynamic forms, admin dashboards, and patient-facing interfaces.',
        icon: 'pi pi-star',
        color: '#6366F1'
      },
      {
        date: '2024 – Present',
        title: 'Freelance Full-Stack Developer',
        company: 'Independent',
        description: 'Building web applications, dashboards, and automation tools for client and personal projects. Work includes responsive frontend development, Firebase integrations, admin panels, workflow automation, and business-oriented tools.',
        icon: 'pi pi-circle',
        color: '#10B981'
      },
      {
        date: '2023 - 2024',
        title: 'Software Engineer (Intern)',
        company: 'Square Health Ltd.',
        description: 'Worked on patient portal, doctor web, and admin dashboard modules. Gained hands-on experience with reCAPTCHA integration, bulk uploads, API-driven forms, and frontend collaboration with backend and QA teams.',
        icon: 'pi pi-circle',
        color: '#10B981'
      }
    ];
    
    this.skillCategories = [
      {
        label: 'Web Development',
        icon: 'pi pi-code',
        skills: [
          {name: 'Angular', level: 'Advanced'},
          {name: 'TypeScript', level: 'Advanced'},
          {name: 'PrimeNG', level: 'Advanced'},
          {name: 'React', level: 'Proficient'},
          {name: 'JavaScript', level: 'Proficient'},
          {name: 'Tailwind CSS', level: 'Proficient'},
          {name: 'RxJS', level: 'Proficient'},
          {name: 'REST API Integration', level: 'Proficient'}
        ]
      },
      {
        label: 'UI/UX & Design',
        icon: 'pi pi-palette',
        skills: [
          {name: 'Figma', level: 'Advanced'},
          {name: 'Pixel-Perfect Execution', level: 'Advanced'},
          {name: 'Canva', level: 'Proficient'},
          {name: 'Adobe Illustrator', level: 'Working Knowledge'}
        ]
      },
      {
        label: 'Backend & DevOps',
        icon: 'pi pi-server',
        skills: [
          {name: 'Git & Git Platforms', level: 'Advanced'},
          {name: 'Laravel (PHP)', level: 'Proficient'},
          {name: 'Node.js', level: 'Proficient'},
          {name: 'Firebase', level: 'Proficient'},
          {name: 'PostgreSQL', level: 'Proficient'},
          {name: 'MySQL', level: 'Proficient'},
          {name: 'Spring Boot', level: 'Working Knowledge'},
          {name: 'Docker', level: 'Familiar'}
        ]
      },
      {
        label: 'Mobile Development',
        icon: 'pi pi-mobile',
        skills: [
          {name: 'Android (Java)', level: 'Proficient'},
          {name: 'iOS (Xcode)', level: 'Familiar'}
        ]
      }
    ];

    this.selectedCategory = this.skillCategories[0];
  }

  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  selectCategory(category: SkillCategory): void {
    if (this.selectedCategory === category) return;
    
    this.isAnimating = true;
    setTimeout(() => {
      this.selectedCategory = category;
      this.isAnimating = false;
    }, 150);
  }

  getLevelFill(level: SkillLevel): number {
    const fills: Record<SkillLevel, number> = {
      'Advanced': 90,
      'Proficient': 75,
      'Working Knowledge': 60,
      'Familiar': 40
    };
    return fills[level];
  }

  getTopSkills(skills: Skill[]): Skill[] {
    return skills.slice(0, 4);
  }

  getRemainingSkills(skills: Skill[]): Skill[] {
    return skills.slice(4);
  }
}
