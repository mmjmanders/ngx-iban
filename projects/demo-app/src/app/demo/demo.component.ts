import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ibanValidator } from "ngx-iban";
import * as isoCountries from "i18n-iso-countries";

@Component({
  selector: "demo-app-demo",
  styleUrls: ["./demo.component.scss"],
  templateUrl: "./demo.component.html"
})
export class DemoComponent implements OnInit {
  iban: string;
  language: string = "";

  ibanInput = new FormControl("", ibanValidator());
  languageInput = new FormControl("");

  ibanForPipe: string;

  readonly countries: string[] = Object.keys(
    isoCountries.getAlpha2Codes()
  ).sort((a, b) => a.localeCompare(b));

  ngOnInit() {
    this.languageInput.valueChanges.subscribe((language: string) => {
      this.ibanInput.setValidators(ibanValidator(language));
      this.ibanInput.updateValueAndValidity();
    });
  }
}
