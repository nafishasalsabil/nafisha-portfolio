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
        date: '2024 – Present',
        title: 'Software Engineer',
        company: 'Square Health Ltd.',
        description: 'Developing production-grade Angular applications with PrimeNG and Tailwind. Delivered modules like invoice generation, prescriber location, dynamic forms, and admin panel redesigns.',
        icon: 'pi pi-star',
        color: '#6366F1'
      },
      {
        date: '2024 – Present',
        title: 'Freelance Full-Stack Developer',
        company: 'Independent',
        description: 'Building and deploying web projects for clients using Angular and Firebase. Work includes responsive UI design, admin panels, and third-party integrations.',
        icon: 'pi pi-circle',
        color: '#10B981'
      },
      {
        date: '2023 - 2024',
        title: 'Software Engineer (Intern)',
        company: 'Square Health Ltd.',
        description: 'Worked on the patient portal, doctor web, and admin dashboard. Gained hands-on experience with reCAPTCHA integration, bulk upload modules, and form-driven UIs. Collaborated with backend and QA for rapid iteration.',
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
