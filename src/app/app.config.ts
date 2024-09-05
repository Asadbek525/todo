import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { baseUrlInterceptor } from './core/interceptors/base-url.interceptor';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Language } from './core/enums/languages.enum';
import { provideState, provideStore } from '@ngrx/store';
import { todoReducer } from './pages/todo/store/todo.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([baseUrlInterceptor, tokenInterceptor])),
    importProvidersFrom(
      TranslateModule.forRoot({
        defaultLanguage: Language.UZ_LAT,
        loader: {
          provide: TranslateLoader,
          useFactory: (http: HttpClient) =>
            new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
          deps: [HttpClient],
        },
      }),
    ),
    provideStore(),
    provideState({ name: 'todoTasks', reducer: todoReducer }),
  ],
};
