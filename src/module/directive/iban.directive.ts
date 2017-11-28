import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import * as IBAN from 'iban';

@Directive({
    selector: 'input[type=text][ngxIban]',
    providers: [{provide: NG_VALIDATORS, useExisting: IbanDirective, multi: true}]
})
export class IbanDirective implements OnInit, OnDestroy, Validator {
    @Input('ngxIban') public iban: string;

    ngOnInit(): void { }

    ngOnDestroy(): void { }

    validate(c: AbstractControl): { [key: string]: any; } {
        return (!this.iban || IBAN.isValid(this.iban)) ? null : {'iban': {value: this.iban}};
    }
}
