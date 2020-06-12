import { IbanDirective, ibanValidator } from "./iban.directive";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";
import { Component } from "@angular/core";
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

  describe("Reactive form tests", () => {
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
});
