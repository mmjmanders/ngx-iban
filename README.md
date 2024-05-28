# ngx-iban

This Angular (7+) library consists of three parts:

1. a directive to use in forms;
2. a pipe to transform a string to the IBAN format (groups of 4 characters);
3. a validator to use in reactive forms;

An optional ISO 3166-1 alpha-2 country code can be passed as a parameter to both the directive and the validator.
When given, validation also checks if the entered IBAN is valid for that specific country.

You can see a live demo of the module [here](https://mmjmanders.github.io/ngx-iban/).

**Important note**: From version 17.3.0 onward this library exports [standalone components](https://angular.io/guide/standalone-components). This mitigates the need to import `NgxIbanModule`.

## Installation

Just use your favorite package manager to install `ngx-iban` and `ibantools`.

## Compatibility table

| ngx-iban | Angular |
|----------|---------|
| 7.x      | 7.x     |
| 8.x      | 8.x     |
| 9.x      | 9.x     |
| 10.x     | 10.x    |
| 11.x     | 11.x    |
| 12.x     | 12.x    |
| 13.x     | 13.x    |
| 14.x     | 14.x    |
| 15.x     | 15.x    |
| 16.x     | 16.x    |
| 17.x     | 17.x    |
| 18.x     | 18.x    |

## Usage

### Directive

```ts
import { Component } from "@angular/core";
import { IbanDirective } from "ngx-iban";

@Component({
  imports: [IbanDirective],
  selector: "my-component",
  template: `
    <form>
      <input type="text" [(ngModel)]="iban" ngxIban>
      
      <!-- Or with an ISO 3166-1 alpha-2 country code -->
      <input type="text" [(ngModel)]="iban" ngxIban="NL">
      
      <!-- Or in a reactive form -->
      <input type="text" [formControl]="iban" ngxIban>
    </form>
  `
})
export class MyComponent {}
```

### Pipe

```html
<span>{{ 'GB82WEST12345698765432' | iban }}</span>
```

becomes

```html
<span>GB82 WEST 1234 5698 7654 32</span>
```

Of course don't forget to import `IbanPipe` in your component.

### Validator

```ts
import { ibanValidator } from "ngx-iban";

new FormControl("", ibanValidator());
```
