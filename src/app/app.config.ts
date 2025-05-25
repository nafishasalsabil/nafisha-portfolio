import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling} from '@angular/router';
import { routes } from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {provideHttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [ provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(),
    provideAnimationsAsync(),
    MessageService,
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark'
        }
      }
    })]
};
