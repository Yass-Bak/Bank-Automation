import { Routes } from '@angular/router';

// ui

import { AppListsComponent } from './listsclient/listsclient.component';
import { AppListsCompteComponent } from './listscompte/listscompte.component';
import { AppClientComponent } from './client/client.component';
import { Compte } from './compteBank/compte';
import { ModifeClientComponent } from './modife-client/modife-client.component';
import { ModifeCompteComponent } from './modife-compte/modife-compte.component';
import { AjouteCompteComponent } from './ajoute-compte/ajoute-compte.component';
import { AuthGuard } from 'src/app/authorization/AuthGuard';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
     
    
      {
        path: 'listsclient',
        component: AppListsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listsCompte/:id',
        component: AppListsCompteComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'ajoute-compte',
        component: AjouteCompteComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'listsCompte',
        component: AppListsCompteComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'ajoute-client',
        component: AppClientComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'modife-client/:id',
        component: ModifeClientComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'Compte',
        component: Compte,
        canActivate: [AuthGuard]
      },
      {
        path: 'modife-compte/:id',
        component: ModifeCompteComponent,
        canActivate: [AuthGuard]
      },
    ],
  },
];
