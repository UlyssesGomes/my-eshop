import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeuix/themes/aura';
// import Lara from '@primeuix/themes/lara';

import { authInterceptor } from './shared/services/auth/auth.interceptor';
import { routes } from './app.routes';
// import { CustomAuraTheme } from '../resources/theme/custom-aura-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([authInterceptor])),          // enable HttpClient
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
