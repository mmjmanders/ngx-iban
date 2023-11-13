import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl,
} from '@angular/forms';
import { ibanValidator, NgxIbanModule } from 'ngx-iban';
import * as isoCountries from 'i18n-iso-countries';

@Component({
  selector: 'ngx-iban-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxIbanModule],
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent implements OnInit {
  iban?: string;
  language: string = '';

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
