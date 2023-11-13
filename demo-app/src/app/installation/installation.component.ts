import { Component } from '@angular/core';
import { HighlightCodeDirective } from '../highlight-code.directive';

@Component({
  selector: 'ngx-iban-installation',
  standalone: true,
  imports: [HighlightCodeDirective],
  styleUrls: [],
  templateUrl: './installation.component.html',
})
export class InstallationComponent {}
