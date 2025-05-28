import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Menubar} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import {NgClass, NgStyle} from '@angular/common';
import {Popover} from 'primeng/popover';
import {LayoutService} from '../../../shared/layout/layout.service';
import {ConfiguratorComponent} from '../../configurator/configurator.component';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-topbar',
  imports: [
    Menubar,
    NgClass,
    Popover,
    NgStyle,
    ConfiguratorComponent,
    RouterLink
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit{
  items: MenuItem[] | undefined;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }

  constructor(public layoutService: LayoutService, private router: Router, private el: ElementRef) {}

  ngOnInit() {
    const path = window.location.pathname;
    const hash = window.location.hash;

    if ((path === '/' || path === '/index.html') && hash) {
      // Clear fragment and navigate to '/'
      this.router.navigateByUrl('/');
    }

    this.items = [
      {
        label: 'HOME',
        command: () => {
          if (window.location.pathname !== '/') {
            this.router.navigate(['/']);
          } else {
            document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        label: 'SERVICES',
        command: () => {
          if (window.location.pathname !== '/') {
            this.router.navigate(['/'], { fragment: 'services' });
          } else {
            document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        label: 'RESUME',
        command: () => {
          if (window.location.pathname !== '/') {
            this.router.navigate(['/'], { fragment: 'resume' });
          } else {
            document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        label: 'PROJECTS',
        command: () => {
          if (window.location.pathname !== '/') {
            this.router.navigate(['/'], { fragment: 'projects' });
          } else {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
      {
        label: 'CONTACT',
        command: () => {
          if (window.location.pathname !== '/') {
            this.router.navigate(['/'], { fragment: 'contact' });
          } else {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    ];


    if (window.innerWidth < 961) {
      this.items.push({
        label: 'SOCIAL',
        items: [
          {
            label: 'Facebook',
            icon: 'pi pi-facebook',
            command: () => window.open('https://www.facebook.com/nafisanam.salsabil/', '_blank')
          },
          {
            label: 'Instagram',
            icon: 'pi pi-instagram',
            command: () => window.open('https://www.instagram.com/nafishasalsabil/', '_blank')
          },
          {
            label: 'LinkedIn',
            icon: 'pi pi-linkedin',
            command: () => window.open('https://www.linkedin.com/in/nafisha-salsabil-38a771223/', '_blank')
          },
          {
            label: 'LeetCode',
            icon: 'pi pi-code',
            command: () => window.open('https://leetcode.com/u/nafishasalsabil/', '_blank')
          },
        ]
      });
    }
  }
  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
  }
}
