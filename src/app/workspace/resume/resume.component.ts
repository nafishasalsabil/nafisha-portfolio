import { Component } from '@angular/core';

export interface ExperienceEntry {
  date: string;
  title: string;
  company: string;
  description: string;
}

@Component({
  selector: 'app-resume',
  imports: [],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss'
})
export class ResumeComponent {
  readonly intro =
    'From internship through full-time engineering and freelance delivery, my path has centered on shipping reliable software for real business workflows—with clean, scalable code as the constant.';

  readonly events: ExperienceEntry[] = [
    {
      date: '2024 – 2026',
      title: 'Software Engineer',
      company: 'Square Health Ltd.',
      description:
        'Developed production-grade Angular applications using PrimeNG and Tailwind. Delivered modules including invoice generation, prescriber location tracking, dynamic forms, admin dashboards, and patient-facing interfaces.'
    },
    {
      date: '2024 – Present',
      title: 'Freelance Full-Stack Developer',
      company: 'Independent',
      description:
        'Building web applications, dashboards, and automation tools for client and personal projects. Work includes responsive frontend development, Firebase integrations, admin panels, workflow automation, and business-oriented tools.'
    },
    {
      date: '2023 – 2024',
      title: 'Software Engineer (Intern)',
      company: 'Square Health Ltd.',
      description:
        'Worked on patient portal, doctor web, and admin dashboard modules. Gained hands-on experience with reCAPTCHA integration, bulk uploads, API-driven forms, and frontend collaboration with backend and QA teams.'
    }
  ];
}
