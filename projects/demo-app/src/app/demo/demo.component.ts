import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ibanValidator } from "ngx-iban";

@Component({
  selector: "demo-app-demo",
  styleUrls: ["./demo.component.scss"],
  templateUrl: "./demo.component.html"
})
export class DemoComponent {
  iban: string;
  ibanInput = new FormControl("", ibanValidator());
}
