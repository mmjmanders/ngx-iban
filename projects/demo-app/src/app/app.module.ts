import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxIbanModule } from "ngx-iban";
import { AppRoutingModule } from "./app-routing.module";
import { InstallationComponent } from "./installation/installation.component";
import { DemoComponent } from "./demo/demo.component";
import { HighlightCodeDirective } from "./highlight-code.directive";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

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
export class AppModule {}
