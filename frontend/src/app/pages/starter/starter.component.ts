import { Component, ViewEncapsulation } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { AppTrafficDistributionComponent } from 'src/app/components/traffic-distribution/traffic-distribution.component';

@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppTrafficDistributionComponent,
  
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }