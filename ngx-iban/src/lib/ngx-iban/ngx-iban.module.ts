import {NgModule} from "@angular/core";
import {IbanDirective} from "./iban.directive";
import {IbanPipe} from "./iban.pipe";

@NgModule({
  declarations: [IbanDirective, IbanPipe],
  exports: [IbanDirective, IbanPipe]
})
export class NgxIbanModule {
}
