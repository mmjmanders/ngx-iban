import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIbanModule } from "ngx-iban";
import { AppRoutingModule } from "./app-routing.module";
import { InstallationComponent } from "./installation/installation.component";
import { DemoComponent } from "./demo/demo.component";
import { HighlightCodeDirective } from "./highlight-code.directive";
import {
  FaIconLibrary,
  FontAwesomeModule
} from "@fortawesome/angular-fontawesome";
import { faPersonChalkboard } from "@fortawesome/free-solid-svg-icons/faPersonChalkboard";
import { faFileLines } from "@fortawesome/free-solid-svg-icons/faFileLines";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons/faCreditCard";

@NgModule({
  declarations: [
    AppComponent,
    InstallationComponent,
    DemoComponent,
    HighlightCodeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgxIbanModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private readonly library: FaIconLibrary) {
    library.addIcons(faCreditCard, faPersonChalkboard, faFileLines);
  }
}
