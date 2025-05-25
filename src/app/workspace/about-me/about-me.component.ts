import { Component } from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-about-me',
  imports: [
    NgStyle
  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  hoveredIndex: number | null = null;



  hobbies = [
    {
      label: 'Web Development',
      icon: 'pi pi-desktop'
    },
    {
      label: 'Android',
      icon: 'pi pi-android'
    },
    {
      label: 'iOS',
      icon: 'pi pi-apple'
    },
    {
      label: 'Ui/Ux',
      icon: 'pi pi-sparkles'
    },
    {
      label: 'Painting',
      icon: 'pi pi-palette'
    },
    {
      label: 'Reading',
      icon: 'pi pi-book'
    },
    {
      label: 'Movie',
      icon: 'pi pi-video'
    },
    {
      label: 'Traveling',
      icon: 'pi pi-flag'
    }


  ];

}
