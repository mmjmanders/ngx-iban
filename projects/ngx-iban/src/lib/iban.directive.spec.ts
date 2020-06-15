import { IbanDirective, ibanValidator } from "./iban.directive";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: `
    <form>
      <input
        ngxIban
        [(ngModel)]="iban"
        [ngModelOptions]="{ standalone: true }"
      />
    </form>
  `
})
class TemplateDrivenFormComponent {
  iban: string;
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
  `
})
class TemplateDrivenFormComponentWithCountryCode {
  iban: string;
  language: string = "BE";
}

@Component({
  template: `
    <form [formGroup]="form">
      <input id="iban" [formControl]="iban" />
    </form>
  `
})
class ReactiveFormComponent {
  form: FormGroup;
  iban: FormControl;

  constructor() {
    this.iban = new FormControl("", ibanValidator());
    this.form = new FormGroup({
      iban: this.iban
    });
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <input id="iban" [formControl]="iban" />
    </form>
  `
})
class ReactiveFormComponentWithCountryCode implements OnInit {
  form: FormGroup;
  iban: FormControl;
  language: FormControl;

  constructor() {
    this.iban = new FormControl("", ibanValidator("BE"));
    this.language = new FormControl("BE");
    this.form = new FormGroup({
      iban: this.iban
    });
  }

  ngOnInit() {
    this.language.valueChanges.subscribe((language: string) => {
      this.iban.setValidators(ibanValidator(language));
      this.iban.updateValueAndValidity();
    });
  }
}

describe("IbanDirective", () => {
  describe("Standalone tests", () => {
    let directive: IbanDirective;

    beforeEach(() => {
      directive = new IbanDirective();
    });

    it("should create an instance", () => {
      expect(directive).toBeTruthy();
    });

    it("should yield valid for valid IBAN", () => {
      const input = new FormControl("NL42TEST0519098218");
      expect(directive.validate(input)).toBeNull("Not a valid IBAN");
    });

    it("should yield invalid for invalid IBAN", () => {
      const input = new FormControl("NL42TEST0519098217");
      expect(directive.validate(input)).toBeTruthy("A valid IBAN");
    });
  });

  describe("Template-driven form tests", () => {
    describe("Standard", () => {
      let fixture: ComponentFixture<TemplateDrivenFormComponent>;
      let component: TemplateDrivenFormComponent;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [FormsModule],
          declarations: [IbanDirective, TemplateDrivenFormComponent]
        }).createComponent(TemplateDrivenFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it("should yield valid for valid IBAN", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "NL42TEST0519098218";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-valid", "Not a valid IBAN");
      });

      it("should yield invalid for invalid IBAN", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "NL42TEST0519098217";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-invalid", "A valid IBAN");
      });
    });

    describe("With ISO 3166-1 alpha-2 country code", () => {
      let fixture: ComponentFixture<TemplateDrivenFormComponentWithCountryCode>;
      let component: TemplateDrivenFormComponentWithCountryCode;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [FormsModule],
          declarations: [
            IbanDirective,
            TemplateDrivenFormComponentWithCountryCode
          ]
        }).createComponent(TemplateDrivenFormComponentWithCountryCode);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it("should yield valid for valid IBAN", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "BE71096123456769";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-valid", "Not a valid IBAN");
      });

      it("should yield invalid for invalid IBAN", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "FR7630006000011234567890189";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-invalid", "A valid IBAN");
      });

      it("should go from valid to invalid when country code changes", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "BE71096123456769";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-valid", "Not a valid IBAN");

        component.language = "NL";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-invalid", "A valid IBAN");
      });

      it("should go from invalid to valid when country code changes", () => {
        const input = fixture.debugElement.query(By.directive(IbanDirective))
          .nativeElement as HTMLInputElement;
        input.value = "FR7630006000011234567890189";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-invalid", "A valid IBAN");

        component.language = "FR";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(input.classList).toContain("ng-valid", "Not a valid IBAN");
      });
    });
  });

  describe("Reactive form tests", () => {
    describe("Standard", () => {
      let fixture: ComponentFixture<ReactiveFormComponent>;
      let component: ReactiveFormComponent;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [IbanDirective, ReactiveFormComponent]
        }).createComponent(ReactiveFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it("should yield valid for valid IBAN", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "NL42TEST0519098218";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true, "Not a valid IBAN");
      });

      it("should yield invalid for invalid IBAN", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "NL42TEST0519098217";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false, "A valid IBAN");
      });
    });

    describe("With ISO 3166-1 alpha-2 country code", () => {
      let fixture: ComponentFixture<ReactiveFormComponentWithCountryCode>;
      let component: ReactiveFormComponentWithCountryCode;

      beforeEach(() => {
        fixture = TestBed.configureTestingModule({
          imports: [ReactiveFormsModule],
          declarations: [IbanDirective, ReactiveFormComponentWithCountryCode]
        }).createComponent(ReactiveFormComponentWithCountryCode);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });

      it("should yield valid for valid IBAN", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "BE71096123456769";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true, "Not a valid IBAN");
      });

      it("should yield invalid for invalid IBAN", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "FR7630006000011234567890189";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false, "A valid IBAN");
      });

      it("should go from valid to invalid when country code changes", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "BE71096123456769";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true, "Not a valid IBAN");

        component.language.setValue("NL");
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false, "A valid IBAN");
      });

      it("should go from invalid to valid when country code changes", () => {
        const input = fixture.debugElement.query(By.css("#iban"))
          .nativeElement as HTMLInputElement;
        input.value = "FR7630006000011234567890189";
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(false, "A valid IBAN");

        component.language.setValue("FR");
        input.dispatchEvent(new Event("input"));
        fixture.detectChanges();
        expect(component.iban.valid).toEqual(true, "Not a valid IBAN");
      });
    });
  });
});
