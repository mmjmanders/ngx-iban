import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IbanModule } from '../../../../src/index';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
    imports: [
        CommonModule,
        IbanModule,
        HomeRoutingModule,
        FormsModule
    ],
    declarations: [HomeComponent],
})
export class HomeModule { }
