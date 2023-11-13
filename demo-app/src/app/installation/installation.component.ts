import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightCodeDirective } from '../highlight-code.directive';

@Component({
  selector: 'ngx-iban-installation',
  standalone: true,
  imports: [CommonModule, HighlightCodeDirective],
  templateUrl: './installation.component.html',
})
export class InstallationComponent {}
