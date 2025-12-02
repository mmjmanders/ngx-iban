import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { isValidIBAN } from './iban.validator';

export const ibanValidator: (countryCode?: string) => ValidatorFn = (
  countryCode
) => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    return isValidIBAN(control.value, countryCode) ? null : { iban: true };
  };
};

@Directive({
  selector: '[ngxIban]',
  standalone: true,
  providers: [
    { provide: NG_VALIDATORS, useExisting: IbanDirective, multi: true },
  ],
})
export class IbanDirective implements Validator, OnChanges {
  @Input('ngxIban') countryCode?: string;
  private _onChange?: () => void;

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    return isValidIBAN(control.value, this.countryCode) ? null : { iban: true };
  }

  /* istanbul ignore next */
  registerOnValidatorChange(fn: () => void) {
    this._onChange = fn;
  }

  /* istanbul ignore next */
  ngOnChanges(changes: SimpleChanges) {
    if ('countryCode' in changes && this._onChange) {
      this._onChange();
    }
  }
}
