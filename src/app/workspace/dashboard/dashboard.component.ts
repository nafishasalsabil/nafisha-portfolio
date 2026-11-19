import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly highlights = [
    {
      icon: 'pi pi-briefcase',
      label: 'Professional Experience',
      value: 'Software Engineer · Square Health'
    },
    {
      icon: 'pi pi-code',
      label: 'Specialization',
      value: 'Full-stack development'
    },
    {
      icon: 'pi pi-sparkles',
      label: 'What I Build',
      value: 'Web applications and AI automation'
    }
  ];
}
