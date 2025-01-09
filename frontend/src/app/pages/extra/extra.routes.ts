import { Routes } from '@angular/router';
import { AppSamplePageComponent } from './sample-page/sample-page.component';

export const ExtraRoutes: Routes = [
  {
    path: '',
    children: [
      
      {
        path: 'sample-page',
        component: AppSamplePageComponent,
      },
    ],
  },
];
