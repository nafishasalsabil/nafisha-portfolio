import { Component } from '@angular/core';

@Component({
  selector: 'app-services',
  imports: [],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  services = [
    {
      label: 'Web Development',
      description: 'Building responsive and performant web interfaces with Angular and modern UI practices.',
      icon: 'pi pi-desktop'
    },
    {
      label: 'Android',
      description: 'Creating mobile-first designs and integrating web apps seamlessly for Android environments.',
      icon: 'pi pi-android'
    },
    {
      label: 'Frameworks',
      description: 'Expertise in React, Angular, PrimeNG, and Tailwind for scalable frontend architecture.',
      icon: 'pi pi-code'
    },
    {
      label: 'Backend Support',
      description: 'Working with APIs and backend flows to support full-stack development needs.',
      icon: 'pi pi-database'
    },
    {
      label: 'Ui/Ux Designing',
      description: 'Designing clean, user-friendly interfaces with attention to usability and visual balance.',
      icon: 'pi pi-sparkles'
    },
    {
      label: 'Graphic Designing',
      description: 'Crafting modern visuals and custom UI elements to enhance product aesthetics.',
      icon: 'pi pi-palette'
    }
  ];

}
