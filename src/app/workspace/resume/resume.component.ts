import {Component, OnInit} from '@angular/core';
import {Timeline} from 'primeng/timeline';
import {Button} from 'primeng/button';
import {NgClass} from '@angular/common';
import {ProgressBar} from 'primeng/progressbar';

@Component({
  selector: 'app-resume',
  imports: [
    Timeline,
    Button,
    NgClass,
    ProgressBar
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit {
  events: any[];
  skillCategories: any[] = [];
  selectedCategory: any = null;
  screenWidth: number = window.innerWidth;
  protected readonly window = window;

  constructor() {
    this.events = [
      {
        date: '2024 – Present',
        title: 'Junior Software Engineer',
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
        title: 'Frontend Developer (Intern)',
        company: 'Square Health Ltd.',
        description: 'Worked on the patient portal, doctor web, and admin dashboard. Gained hands-on experience with reCAPTCHA integration, bulk upload modules, and form-driven UIs. Collaborated with backend and QA for rapid iteration.',
        icon: 'pi pi-circle',
        color: '#10B981'
      },
      {
        date: '2020 – 2023',
        title: 'Student Developer (Unpaid)',
        company: 'University Projects',
        description: 'Worked on small-scale full-stack projects and academic tools during university. Focused on learning Angular, REST APIs, and UI/UX principles.',
        icon: 'pi pi-circle',
        color: '#F59E0B'
      }
    ];
    this.skillCategories = [
      {
        label: 'Web Development',
        skills: [
          {name: 'Angular', value: 90, displayValue: 0},
          {name: 'React', value: 65, displayValue: 0},
          {name: 'TypeScript', value: 85, displayValue: 0},
          {name: 'JavaScript', value: 80, displayValue: 0},
          {name: 'PrimeNG', value: 90, displayValue: 0},
          {name: 'Tailwind CSS', value: 75, displayValue: 0}
        ]
      },
      {
        label: 'UI/UX & Design',
        skills: [
          {name: 'Figma', value: 85, displayValue: 0},
          {name: 'Canva', value: 80, displayValue: 0},
          {name: 'Adobe Illustrator', value: 70, displayValue: 0},
          {name: 'Pixel-Perfect Execution', value: 90, displayValue: 0}
        ]
      },
      {
        label: 'Backend & DevOps',
        skills: [
          {name: 'Laravel (PHP)', value: 80, displayValue: 0},
          {name: 'Firebase', value: 70, displayValue: 0},
          {name: 'Node.js', value: 75, displayValue: 0},
          {name: 'Spring Boot (basic)', value: 70, displayValue: 0},
          {name: 'Docker', value: 50, displayValue: 0},
          {name: 'Git & Git Platforms', value: 85, displayValue: 0}
        ]
      },
      {
        label: 'Mobile Development',
        skills: [
          {name: 'iOS (Xcode)', value: 40, displayValue: 0},
          {name: 'Android (Java)', value: 75, displayValue: 0}
        ]
      }
    ];


    this.selectedCategory = this.skillCategories[0];


  }

  ngOnInit(): void {
    this.animateSkills(this.selectedCategory.skills);
    window.addEventListener('resize', () => {
      this.screenWidth = window.innerWidth;
    });
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
    this.animateSkills(category.skills);
  }

  animateSkills(skills: any[]) {
    for (let skill of skills) {
      skill.displayValue = 0;
      const interval = setInterval(() => {
        if (skill.displayValue < skill.value) {
          skill.displayValue += 1;
        } else {
          clearInterval(interval);
        }
      }, 0);
    }
  }
}
