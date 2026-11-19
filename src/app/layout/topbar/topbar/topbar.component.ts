import { Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Menubar } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NgClass, NgStyle } from '@angular/common';
import { Popover } from 'primeng/popover';
import { LayoutService } from '../../../shared/layout/layout.service';
import { ConfiguratorComponent } from '../../configurator/configurator.component';
import { Router, RouterLink } from '@angular/router';

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
export class TopbarComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  isScrolled = false;
  activeSection = 'dashboard';

  private observer?: IntersectionObserver;
  private readonly sectionIds = [
    'dashboard',
    'projects',
    'resume',
    'about-me',
    'contact'
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.pageYOffset > 0;
  }

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.buildItems();
    this.setupSectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private buildItems(): void {
    this.items = [
      {
        label: 'Home',
        styleClass: this.activeClass('dashboard'),
        command: () => this.navigateTo('dashboard')
      },
      {
        label: 'Work',
        styleClass: this.activeClass('projects'),
        command: () => this.navigateTo('projects')
      },
      {
        label: 'Experience',
        styleClass: this.activeClass('resume'),
        command: () => this.navigateTo('resume')
      },
      {
        label: 'About',
        styleClass: this.activeClass('about-me'),
        command: () => this.navigateTo('about-me')
      },
      {
        label: 'Contact',
        styleClass: this.activeClass('contact'),
        command: () => this.navigateTo('contact')
      }
    ];

    if (typeof window !== 'undefined' && window.innerWidth < 961) {
      this.items.push({
        label: 'Social',
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
            command: () =>
              window.open('https://www.linkedin.com/in/nafisha-salsabil-38a771223/', '_blank')
          },
          {
            label: 'GitHub',
            icon: 'pi pi-github',
            command: () => window.open('https://github.com/nafishasalsabil/', '_blank')
          },
          {
            label: 'LeetCode',
            icon: 'pi pi-code',
            command: () => window.open('https://leetcode.com/u/nafishasalsabil/', '_blank')
          }
        ]
      });
    }
  }

  private activeClass(sectionId: string): string {
    return this.activeSection === sectionId ? 'nav-active' : '';
  }

  private navigateTo(sectionId: string): void {
    const scroll = () => {
      this.scrollToSection(sectionId);
      this.setActiveSection(sectionId);
      this.closeMobileMenu();
    };

    if (window.location.pathname !== '/') {
      this.router.navigate(['/'], { fragment: sectionId }).then(() => {
        setTimeout(scroll, 120);
      });
      return;
    }

    this.router.navigate([], { fragment: sectionId, replaceUrl: true });
    scroll();
  }

  /**
   * Home (#dashboard) must scroll to the document top so main-content's
   * topbar padding stays in view. Other sections offset by measured topbar height.
   */
  private scrollToSection(sectionId: string): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (sectionId === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    const topbar = this.el.nativeElement.querySelector('.topbar') as HTMLElement | null;
    const offset = topbar?.offsetHeight ?? 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  private setActiveSection(sectionId: string): void {
    if (this.activeSection === sectionId) {
      return;
    }
    this.activeSection = sectionId;
    this.buildItems();
  }

  private setupSectionObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          this.setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-30% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5]
      }
    );

    setTimeout(() => {
      this.sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          this.observer?.observe(el);
        }
      });
    }, 200);
  }

  private closeMobileMenu(): void {
    const root = this.el.nativeElement as HTMLElement;
    const button = root.querySelector(
      '.p-menubar-button, button.p-menubar-button'
    ) as HTMLButtonElement | null;
    const menu = root.querySelector('.p-menubar-mobile-active, .p-menubar-root-list');
    if (button && menu && getComputedStyle(button).display !== 'none') {
      // Only toggle closed if the mobile panel appears open
      if (root.querySelector('.p-menubar-mobile-active')) {
        button.click();
      }
    }
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme
    }));
  }
}
