import { NgModule } from '@angular/core';
import { IbanPipe } from './iban.pipe';
import { IbanDirective } from './iban.directive';

@NgModule({
  declarations: [IbanDirective, IbanPipe],
  exports: [IbanDirective, IbanPipe],
})
export class NgxIbanModule {}
