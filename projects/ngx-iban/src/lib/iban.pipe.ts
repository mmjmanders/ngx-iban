import { Pipe, PipeTransform } from "@angular/core";
import { friendlyFormatIBAN } from "ibantools";

@Pipe({
  name: "iban"
})
export class IbanPipe implements PipeTransform {
  transform(value: string, separator?: string): string {
    return value ? friendlyFormatIBAN(value, separator) : null;
  }
}
