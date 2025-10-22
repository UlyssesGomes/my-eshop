import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
// import Lara from '@primeuix/themes/lara';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
// import { CustomAuraTheme } from '../resources/theme/custom-aura-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(), // habilita o HttpClient
    providePrimeNG({
      theme: {
        preset: Aura, // CustomAuraTheme,
        options: {
            cssLayer: {
                name: 'primeng',
                order: 'theme, base, primeng'
            }
        }
      }
    })
  ]
};
