# ngx-iban

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
