import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import {
  HttpClientModule,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ApiModule } from './api/api.module';
import { WebsocketServicesModule } from './services/websockets/websocket-services.module';

export const authenticationInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  if (!req.url.includes(environment.apiBaseUrl)) return next(req);

  const jwt = localStorage.getItem('id_token');

  if (jwt) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`,
      },
    });
  }

  return next(req);
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId, {
              oneTapEnabled: false,
            }),
          },
        ],
        onError: error => {
          console.error(error);
        },
      } as SocialAuthServiceConfig,
    },
    importProvidersFrom(ApiModule.forRoot({ rootUrl: environment.apiBaseUrl })),
    importProvidersFrom(
      WebsocketServicesModule.forRoot({ rootUrl: environment.apiBaseUrl })
    ),
    importProvidersFrom(HttpClientModule),
    provideHttpClient(withInterceptors([authenticationInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(StoreModule.forRoot()),
    importProvidersFrom(EffectsModule.forRoot()),
    // provideStore({ books: booksReducer }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    importProvidersFrom(NgbModal),
    importProvidersFrom(NgbModalConfig),
  ],
};
