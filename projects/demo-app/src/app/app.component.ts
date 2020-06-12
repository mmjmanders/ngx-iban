import { Component } from "@angular/core";
import { faPiggyBank } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "demo-app-root",
  styleUrls: ["./app.component.scss"],
  templateUrl: "./app.component.html"
})
export class AppComponent {
  faPiggyBank = faPiggyBank;
}
