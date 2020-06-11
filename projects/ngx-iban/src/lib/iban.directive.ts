import { Directive } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn
} from "@angular/forms";
import * as IBAN from "iban";

export function ibanValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      return IBAN.isValid(control.value)
        ? null
        : { iban: { value: control.value } };
    }
    return null;
  };
}

@Directive({
  selector: "[ngxIban]",
  providers: [
    { provide: NG_VALIDATORS, useExisting: IbanDirective, multi: true }
  ]
})
export class IbanDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return ibanValidator()(control);
  }
}
