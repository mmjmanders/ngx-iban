import { Pipe, PipeTransform } from '@angular/core';
import { friendlyFormatIBAN } from 'ibantools';

@Pipe({
  name: 'iban',
  standalone: true,
})
export class IbanPipe implements PipeTransform {
  transform(value?: string | null, separator?: string): string | null {
    return value ? friendlyFormatIBAN(value, separator) : null;
  }
}
