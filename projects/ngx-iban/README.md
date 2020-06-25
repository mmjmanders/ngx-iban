# ngx-iban

This Angular 9 module consists of three parts:

1. a directive to use in template-driven forms;
2. a validator to use in reactive forms;
3. a pipe to transform a string to the IBAN format (groups of 4 characters)

An optional ISO 3166-1 alpha-2 country code can be passed as a parameter to both the directive and the validator.
When given, validation also checks if the entered IBAN is valid for that specific country.

You can see a live demo of the module [here](https://mmjmanders.github.io/ngx-iban/).

## Installation

You can install `ngx-iban` via:

```bash
npm install iban ngx-iban --save
```

or

```bash
yarn add iban ngx-iban
```

## Compatibility table

|ngx-iban|Angular|
|-|-|
|7.x|7.x|
|8.x|8.x|
|9.x|9.x|

## Usage

```ts
import { NgModule } from "@angular/core";
import { NgxIbanModule } from "ngx-iban";

@NgModule({
  imports: [NgxIbanModule]
})
export class AppModule {}
```

### Template-driven forms

```html
<form>
  <input type="text" [(ngModel)]="iban" ngxIban>

  <!-- Or with an ISO 3166-1 alpha-2 country code -->
  <input type="text" [(ngModel)]="iban" ngxIban="NL">
</form>
```

### Reactive forms

```ts
import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ibanValidator } from "ngx-iban";

@Component({
  selector: "my-component",
  styleUrls: ["./my.component.scss"],
  templateUrl: "./my.component.html"
})
export class MyComponent {
  iban = new FormControl("", ibanValidator());

  // Or with an ISO 3166-1 alpha-2 country code
  iban = new FormControl("", ibanValidator("NL"));
}
```

```html
<form>
  <input type="text" [formControl]="iban">
</form>
```

### Pipe

```html
<span>{{ 'GB82WEST12345698765432' | iban }}</span>
```

becomes

```html
<span>GB82 WEST 1234 5698 7654 32</span>
```
