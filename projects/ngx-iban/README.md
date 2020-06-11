# ngx-iban

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
  <input type="text" [(ngModel)]="iban" ngxIban />
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
}
```

```html
<form>
  <input type="text" [formControl]="iban" />
</form>
```
