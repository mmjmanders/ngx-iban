import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IbanDirective } from "./directive/iban.directive";

// Export module's public API
export { IbanDirective } from "./directive/iban.directive";

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [IbanDirective],
  declarations: [IbanDirective]
})
export class IbanModule { }
