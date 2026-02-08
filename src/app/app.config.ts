import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideHttpClient } from '@angular/common/http';

export const appConfig2: ApplicationConfig = {
  providers: [
    provideHttpClient(),
  ]
};


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

    // دمجنا كل إعدادات الراوتر هنا في استدعاء واحد فقط
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'enabled', // الصعود للأعلى عند الانتقال
        anchorScrolling: 'enabled'            // دعم الروابط الداخلية (anchors)
      })
    )
  ]
};
