import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatPaginatorIntl } from '@angular/material/paginator';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    { provide: MatPaginatorIntl, useValue: { itemsPerPageLabel: '' } }
  ]
};
