import {Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {Ripple} from 'primeng/ripple';
import {MenuItem, PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-topbar',
  imports: [
    Menubar,
    Ripple,
    PrimeTemplate
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit{
  items: MenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Home',
      },
      {
        label: 'Services',
        command: () =>
          document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
      },
      {
        label: 'Resume',
        command: () =>
          document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' })
      },
      {
        label: 'Projects',
      },
      {
        label: 'Contact',
      },
    ];

    if (window.innerWidth < 961) {
      this.items.push({
        label: 'Social',
        items: [
          {
            label: 'Facebook',
            icon: 'pi pi-facebook',
            command: () => window.open('https://facebook.com', '_blank')
          },
          {
            label: 'Twitter',
            icon: 'pi pi-twitter',
            command: () => window.open('https://twitter.com', '_blank')
          },
          {
            label: 'Instagram',
            icon: 'pi pi-instagram',
            command: () => window.open('https://instagram.com', '_blank')
          }
        ]
      });
    }
  }
}
