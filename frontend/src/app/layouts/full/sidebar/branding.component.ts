import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding"   style=" margin-left: 60px;" >
      <a [routerLink]="['/']">
        <img
        style="width: 60px;"
          src="./assets/images/logos/bank.jpg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}
}
