import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IbanModule } from 'ngx-iban';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        IbanModule.forRoot(),
        HomeRoutingModule,
        FormsModule
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
