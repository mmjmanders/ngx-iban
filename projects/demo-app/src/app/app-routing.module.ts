import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { environment } from "../environments/environment";
import { InstallationComponent } from "./installation/installation.component";
import { DemoComponent } from "./demo/demo.component";

const routes: Routes = [
  {
    path: "demo",
    component: DemoComponent
  },
  {
    path: "installation",
    component: InstallationComponent
  },
  {
    path: "",
    redirectTo: "/demo",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: !environment.production,
      useHash: environment.production
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
