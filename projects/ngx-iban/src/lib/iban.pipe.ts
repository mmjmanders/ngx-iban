import { Pipe, PipeTransform } from "@angular/core";
import * as IBAN from "iban";

@Pipe({
  name: "iban"
})
export class IbanPipe implements PipeTransform {
  transform(value: string, separator?: string): string {
    return value ? IBAN.printFormat(value, separator) : null;
  }
}
