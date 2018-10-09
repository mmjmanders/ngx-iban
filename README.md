<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/mmjmanders/ngx-iban/master/demo/src/assets/logo.svg">
</p>

# ngx-iban - Angular directive for validating IBAN input fields.

[![npm version](https://badge.fury.io/js/ngx-iban.svg)](https://badge.fury.io/js/ngx-iban)
[![Build Status](https://travis-ci.org/mmjmanders/ngx-iban.svg?branch=master)](https://travis-ci.org/mmjmanders/ngx-iban)
[![Coverage Status](https://coveralls.io/repos/github/mmjmanders/ngx-iban/badge.svg?branch=master)](https://coveralls.io/github/mmjmanders/ngx-iban?branch=master)
[![dependency Status](https://david-dm.org/mmjmanders/ngx-iban/status.svg)](https://david-dm.org/mmjmanders/ngx-iban)
[![devDependency Status](https://david-dm.org/mmjmanders/ngx-iban/dev-status.svg?branch=master)](https://david-dm.org/mmjmanders/ngx-iban#info=devDependencies)

## Demo

View all the directives in action at https://mmjmanders.github.io/ngx-iban

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-iban` via:
```shell
npm install --save ngx-iban iban
```

or

```shell
yarn add ngx-iban iban
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-iban`:
```js
map: {
  'ngx-iban': 'node_modules/ngx-iban/bundles/ngx-iban.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { IbanModule } from 'ngx-iban';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [IbanModule, ...], 
})
export class OtherModule {
}
```

## Usage

```html
<input type="text" ngxIban [(ngModel)]="iban">
```


## License

Copyright (c) 2017 Mark Manders. Licensed under the MIT License (MIT)

