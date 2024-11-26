import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { IbanDirective, IbanPipe, ibanValidator } from 'ngx-iban';
import * as isoCountries from 'i18n-iso-countries';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-iban-demo',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IbanDirective,
    IbanPipe,
  ],
  styleUrls: ['./demo.component.scss'],
  templateUrl: './demo.component.html',
})
export class DemoComponent implements OnInit {
  iban?: string;
  language = '';

  ibanInput = new UntypedFormControl('', ibanValidator());
  languageInput = new UntypedFormControl('');

  ibanForPipe?: string;

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
