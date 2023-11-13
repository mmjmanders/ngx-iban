import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faCreditCard,
  faFileLines,
  faPersonChalkboard,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  standalone: true,
  imports: [RouterModule, FontAwesomeModule],
  selector: 'ngx-iban-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(readonly library: FaIconLibrary) {
    library.addIcons(faCreditCard, faFileLines, faPersonChalkboard);
  }
}
