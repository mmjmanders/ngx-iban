import { Route } from '@angular/router';
import { DemoComponent } from './demo/demo.component';
import { InstallationComponent } from './installation/installation.component';

export const appRoutes: Route[] = [
  {
    path: 'demo',
    component: DemoComponent,
  },
  {
    path: 'installation',
    component: InstallationComponent,
  },
  {
    path: '',
    redirectTo: '/demo',
    pathMatch: 'full',
  },
];
