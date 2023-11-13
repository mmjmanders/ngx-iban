import { isDevMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCreditCard,
  faFileLines,
  faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxIbanModule } from 'ngx-iban';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes, { enableTracing: isDevMode() }),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxIbanModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(readonly library: FaIconLibrary) {
    library.addIcons(faCreditCard, faFileLines, faPersonChalkboard);
  }
}
