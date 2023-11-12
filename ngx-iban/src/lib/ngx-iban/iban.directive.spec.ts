import { IbanDirective, ibanValidator } from './iban.directive';
import {
  UntypedFormControl,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <form>
      <input
        ngxIban
        [(ngModel)]="iban"
        [ngModelOptions]="{ standalone: true }"
      />
    </form>
  `,
})
class TemplateDrivenFormComponent {
  iban?: string;
}

@Component({
  template: `
    <form>
      <input
        [ngxIban]="language"
        [(ngModel)]="iban"
        [ngModelOptions]="{ standalone: true }"
      />
    </form>
  `,
})
class TemplateDrivenFormComponentWithCountryCodeComponent {
  iban?: string;
  language: string = 'BE';
}

@Component({
  template: `
    <form [formGroup]="form">
      <input id="iban" [formControl]="iban" />
    </form>
  `,
})
class ReactiveFormComponent {
  form: UntypedFormGroup;
  iban: UntypedFormControl;

  constructor() {
    this.iban = new UntypedFormControl('', ibanValidator());
    this.form = new UntypedFormGroup({
      iban: this.iban,
    });
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <input id="iban" [formControl]="iban" />
    </form>
  `,
})
class ReactiveFormComponentWithCountryCodeComponent implements OnInit {
  form: UntypedFormGroup;
  iban: UntypedFormControl;
  language: UntypedFormControl;

  constructor() {
    this.iban = new UntypedFormControl('', ibanValidator('BE'));
    this.language = new UntypedFormControl('BE');
    this.form = new UntypedFormGroup({
      iban: this.iban,
    });
  }

  ngOnInit() {
    this.language.valueChanges.subscribe((language: string) => {
      this.iban.setValidators(ibanValidator(language));
      this.iban.updateValueAndValidity();
    });
  }
}

describe('IbanDirective', () => {
  describe('Standalone tests', () => {
    let directive: IbanDirective;

    beforeEach(() => {
      directive = new IbanDirective();
    });

    it('should create an instance', () => {
      expect(directive).toBeTruthy();
    });

    it('should yield valid for valid IBAN', () => {
      const input = new UntypedFormControl('NL42TEST0519098218');
      expect(directive.validate(input)).toBeNull();
    });

    it('should yield valid for valid IBAN all lowercase', () => {
      const input = new UntypedFormControl('nl42test0519098218');
      expect(directive.validate(input)).toBeNull();
    });

    it('should yield valid for valid IBAN mixed case', () => {
      const input = new UntypedFormControl('nL42tEsT0519098218');
      expect(directive.validate(input)).toBeNull();
    });

    it('should yield invalid for invalid IBAN', () => {
      const input = new UntypedFormControl('NL42TEST0519098217');
      expect(directive.validate(input)).toBeTruthy();
    });
  });

  describe('Template-driven form tests', () => {
    describe('Standard', () => {
      let fixture: ComponentFixture<TemplateDrivenFormComponent>;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [FormsModule],
          declarations: [IbanDirective, TemplateDrivenFormComponent],
        }).createComponent(TemplateDrivenFormComponent);
        fixture.detectChanges();
      });

      it('should yield valid for valid IBAN', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'NL42TEST0519098218';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
      });

      it('should yield invalid for invalid IBAN', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'NL42TEST0519098217';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-invalid');
      });
    });

    describe('With ISO 3166-1 alpha-2 country code', () => {
      let fixture: ComponentFixture<TemplateDrivenFormComponentWithCountryCodeComponent>;
      let component: TemplateDrivenFormComponentWithCountryCodeComponent;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [FormsModule],
          declarations: [
            IbanDirective,
            TemplateDrivenFormComponentWithCountryCodeComponent,
          ],
        }).createComponent(TemplateDrivenFormComponentWithCountryCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should yield valid for valid IBAN', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'BE71096123456769';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
      });

      it('should yield invalid for invalid IBAN', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'FR7630006000011234567890189';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-invalid');
      });

      it('should go from valid to invalid when country code changes', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'BE71096123456769';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');

        component.language = 'NL';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-invalid');
      });

      it('should go from invalid to valid when country code changes', () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = 'FR7630006000011234567890189';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-invalid');

        component.language = 'FR';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(input.classList).toContain('ng-valid');
      });
    });
  });

  describe('Reactive form tests', () => {
    describe('Standard', () => {
      let fixture: ComponentFixture<ReactiveFormComponent>;
      let component: ReactiveFormComponent;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [IbanDirective, ReactiveFormComponent],
        }).createComponent(ReactiveFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should yield valid for valid IBAN', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'NL42TEST0519098218';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true);
      });

      it('should yield invalid for invalid IBAN', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'NL42TEST0519098217';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false);
      });
    });

    describe('With ISO 3166-1 alpha-2 country code', () => {
      let fixture: ComponentFixture<ReactiveFormComponentWithCountryCodeComponent>;
      let component: ReactiveFormComponentWithCountryCodeComponent;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [
            IbanDirective,
            ReactiveFormComponentWithCountryCodeComponent,
          ],
        }).createComponent(ReactiveFormComponentWithCountryCodeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it('should yield valid for valid IBAN', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'BE71096123456769';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true);
      });

      it('should yield invalid for invalid IBAN', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'FR7630006000011234567890189';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false);
      });

      it('should go from valid to invalid when country code changes', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'BE71096123456769';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true);

        component.language.setValue('NL');
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false);
      });

      it('should go from invalid to valid when country code changes', () => {
        const input = fixture.debugElement.query(By.css('#iban'))
          .nativeElement as HTMLInputElement;
        input.value = 'FR7630006000011234567890189';
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false);

        component.language.setValue('FR');
        input.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true);
      });
    });
  });
});
