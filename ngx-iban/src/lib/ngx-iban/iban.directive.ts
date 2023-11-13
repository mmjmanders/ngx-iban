import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { electronicFormatIBAN, isValidIBAN } from 'ibantools';

export const ibanValidator: (countryCode?: string) => ValidatorFn = (
  countryCode
) => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (countryCode && control.value) {
      return new RegExp(`^${countryCode}.*$`, 'i').test(control.value) &&
        isValidIBAN(electronicFormatIBAN(control.value)!)
        ? null
        : { iban: { value: control.value } };
    } else if (control.value) {
      return isValidIBAN(electronicFormatIBAN(control.value)!)
        ? null
        : { iban: { value: control.value } };
    }
    return null;
  };
};

@Directive({
  selector: '[ngxIban]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: IbanDirective, multi: true },
  ],
})
export class IbanDirective implements Validator, OnChanges {
  @Input('ngxIban') countryCode?: string;
  private _onChange?: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    return ibanValidator(this.countryCode)(control);
  }

  registerOnValidatorChange(fn: () => void) {
    this._onChange = fn;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('countryCode' in changes && this._onChange) {
      this._onChange();
    }
  }
}
