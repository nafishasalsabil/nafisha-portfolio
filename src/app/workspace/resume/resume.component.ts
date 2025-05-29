import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Timeline} from 'primeng/timeline';
import {Button} from 'primeng/button';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-resume',
  imports: [
    Timeline,
    Button,
    NgClass,
    NgStyle
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent implements OnInit, AfterViewInit {
  events: any[];
  skillCategories: any[] = [];
  selectedCategory: any = null;
  screenWidth: number = window.innerWidth;
  skillLevels = ['Working Knowledge', 'Competent', 'Highly Skilled', 'Expert'];
  animate = false;
  @ViewChild('skillSection', {static: false}) skillSectionRef!: ElementRef;
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
          {name: 'Angular', level: 3},
          {name: 'TypeScript', level: 3},
          {name: 'JavaScript', level: 2},
          {name: 'PrimeNG', level: 3},
          {name: 'Tailwind CSS', level: 2},
          {name: 'React', level: 2},
        ]
      },
      {
        label: 'UI/UX & Design',
        skills: [
          {name: 'Figma', level: 2},
          {name: 'Canva', level: 2},
          {name: 'Adobe Illustrator', level: 1},
          {name: 'Pixel-Perfect Execution', level: 3}
        ]
      },
      {
        label: 'Backend & DevOps',
        skills: [
          {name: 'Laravel (PHP)', level: 2},
          {name: 'Firebase', level: 2},
          {name: 'Node.js', level: 1},
          {name: 'Spring Boot (basic)', level: 1},
          {name: 'Docker', level: 1},
          {name: 'Git & Git Platforms', level: 3}
        ]
      },
      {
        label: 'Mobile Development',
        skills: [
          {name: 'iOS (Xcode)', level: 1},
          {name: 'Android (Java)', level: 2}
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

  ngAfterViewInit(): void {
    if (!this.skillSectionRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animate = true;
          observer.unobserve(entry.target);
        }
      },
      {threshold: 0.3}
    );

    observer.observe(this.skillSectionRef.nativeElement);
  }

  selectCategory(category: any) {
    this.selectedCategory = category;
  }

}
