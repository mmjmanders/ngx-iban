import { IbanDirective } from '../iban.module';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By, BrowserModule } from '@angular/platform-browser';

@Component({
    template: `<input type="text" ngxIban [(ngModel)]="iban">`,
    providers: [IbanDirective]
})
export class OptionalIban {
    public iban: string;
}

@Component({
    template: `<input type="text" ngxIban [(ngModel)]="iban" required>`,
    providers: [IbanDirective]
})
export class RequiredIban {
    public iban: string;
}

describe('Iban: directive', () => {
    let optional: ComponentFixture<OptionalIban>;
    let required: ComponentFixture<RequiredIban>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                BrowserModule
            ],
            declarations: [OptionalIban, RequiredIban, IbanDirective]
        }).compileComponents();

        optional = TestBed.createComponent(OptionalIban);
        optional.autoDetectChanges();
        required = TestBed.createComponent(RequiredIban);
        required.autoDetectChanges();
    }));

    it('optional should pass for empty iban', () => {
        const elem: DebugElement = optional.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(true);
    });

    it('optional should pass for valid iban', () => {
        const elem: DebugElement = optional.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451912';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(true);
    });

    it('optional should fail for invalid iban', () => {
        const elem: DebugElement = optional.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451911';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(false);
    });

    it('required should fail for empty iban', () => {
        const elem: DebugElement = required.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = '';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(false);
    });

    it('required should pass for valid iban', () => {
        const elem: DebugElement = required.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451912';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(true);
    });

    it('required should fail for invalid iban', () => {
        const elem: DebugElement = required.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451911';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(false);
    });

    it('going from invalid to valid', () => {
        const elem: DebugElement = optional.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451911';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(false);
        input.value = 'NL64SNSB0930451912';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(true);
    });

    it('going from valid to invalid', () => {
        const elem: DebugElement = optional.debugElement;
        const input: HTMLInputElement = elem.query(By.css('input')).nativeElement as HTMLInputElement;
        input.value = 'NL64SNSB0930451912';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(true);
        input.value = 'NL64SNSB0930451911';
        input.dispatchEvent(new Event('input'));
        expect(input.classList.contains('ng-valid')).toBe(false);
    });
});
