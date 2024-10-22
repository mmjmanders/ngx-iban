import { ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  RouterFeatures,
  withDebugTracing,
  withHashLocation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const features: RouterFeatures[] = isDevMode()
  ? [withDebugTracing()]
  : [withHashLocation()];
export const appConfig: ApplicationConfig = {
  providers: [provideClientHydration(), provideRouter(appRoutes, ...features)],
};
