import { IbanPipe } from "./iban.pipe";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

@Component({
  template: ` <span id="iban">{{ iban | iban: separator }}</span> `
})
class TestComponent {
  iban: string = "GB82WEST12345698765432";
  separator: string;
}

describe("IbanPipe", () => {
  describe("Standalone tests", () => {
    let pipe: IbanPipe;

    beforeEach(() => {
      pipe = new IbanPipe();
    });

    it("should create an instance", () => {
      expect(pipe).toBeTruthy();
    });

    it("should convert IBAN to print format", () => {
      const output = pipe.transform("GB82WEST12345698765432");
      expect(output).toEqual("GB82 WEST 1234 5698 7654 32");
    });

    it("should return null when an empty string is given", () => {
      const output = pipe.transform("");
      expect(output).toBeNull();
    });

    it("should return null when null is given", () => {
      const output = pipe.transform(null);
      expect(output).toBeNull();
    });

    it("should convert IBAN to print format with separator", () => {
      const output = pipe.transform("GB82WEST12345698765432", "-");
      expect(output).toEqual("GB82-WEST-1234-5698-7654-32");
    });
  });

  describe("Used in a component", () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;

    beforeEach(() => {
      fixture = TestBed.configureTestingModule({
        declarations: [IbanPipe, TestComponent]
      }).createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it("should render IBAN in print format", () => {
      const input = fixture.debugElement.query(By.css("#iban"))
        .nativeElement as HTMLSpanElement;
      expect(input.innerHTML).toEqual("GB82 WEST 1234 5698 7654 32");
    });

    it("should render IBAN in print format with separator", () => {
      component.separator = "-";
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css("#iban"))
        .nativeElement as HTMLSpanElement;
      expect(input.innerHTML).toEqual("GB82-WEST-1234-5698-7654-32");
    });
  });
});
