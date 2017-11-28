import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GettingStartedComponent } from './getting-started.component';
import { GettingStartedRoutingModule } from './getting-started-routing.module';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  imports: [
    CommonModule,
    GettingStartedRoutingModule,
    HighlightModule.forRoot()
  ],
  declarations: [GettingStartedComponent],
})
export class GettingStartedModule { }
