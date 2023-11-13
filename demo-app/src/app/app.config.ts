import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  RouterFeatures,
  withDebugTracing,
  withHashLocation,
} from '@angular/router';
import { appRoutes } from './app.routes';

const features: RouterFeatures[] = isDevMode()
  ? [withDebugTracing()]
  : [withHashLocation()];
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes, ...features)],
};
